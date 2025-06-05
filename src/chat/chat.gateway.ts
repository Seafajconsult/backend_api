import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { WsJwtGuard } from '../common/guards/ws-jwt.guard';
import { SendMessageDto, JoinRoomDto } from './dto';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<string, string>(); // socketId -> userId

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract user from JWT token in handshake
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
      
      if (!token) {
        client.disconnect();
        return;
      }

      // Verify token and get user (you'd implement this in ChatService)
      const user = await this.chatService.verifySocketToken(token);
      
      if (!user) {
        client.disconnect();
        return;
      }

      client.data.user = user;
      this.connectedUsers.set(client.id, user.id);
      
      this.logger.log(`User ${user.email} connected with socket ${client.id}`);
      
      // Join user to their personal room
      client.join(`user_${user.id}`);
      
      // Notify user of successful connection
      client.emit('connected', { message: 'Connected successfully', user: user });
    } catch (error) {
      this.logger.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      this.connectedUsers.delete(client.id);
      this.logger.log(`User ${userId} disconnected`);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { roomId } = joinRoomDto;
      const user = client.data.user;

      // Verify user has access to this room
      const hasAccess = await this.chatService.verifyRoomAccess(user.id, roomId);
      
      if (!hasAccess) {
        client.emit('error', { message: 'Access denied to this room' });
        return;
      }

      // Join the room
      client.join(roomId);
      
      // Get recent messages for this room
      const messages = await this.chatService.getRoomMessages(roomId, 50);
      
      client.emit('joined_room', { roomId, messages });
      client.to(roomId).emit('user_joined', { userId: user.id, email: user.email });
      
      this.logger.log(`User ${user.email} joined room ${roomId}`);
    } catch (error) {
      this.logger.error('Join room error:', error);
      client.emit('error', { message: 'Failed to join room' });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { roomId, content } = sendMessageDto;
      const user = client.data.user;

      // Verify user has access to this room
      const hasAccess = await this.chatService.verifyRoomAccess(user.id, roomId);
      
      if (!hasAccess) {
        client.emit('error', { message: 'Access denied to this room' });
        return;
      }

      // Save message to database
      const message = await this.chatService.createMessage({
        content,
        senderId: user.id,
        roomId,
      });

      // Broadcast message to all users in the room
      this.server.to(roomId).emit('new_message', {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        roomId: message.roomId,
        createdAt: message.createdAt,
        sender: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });

      this.logger.log(`Message sent in room ${roomId} by user ${user.email}`);
    } catch (error) {
      this.logger.error('Send message error:', error);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    const user = client.data.user;

    client.leave(roomId);
    client.to(roomId).emit('user_left', { userId: user.id, email: user.email });
    
    this.logger.log(`User ${user.email} left room ${roomId}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('typing_start')
  async handleTypingStart(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    const user = client.data.user;

    client.to(roomId).emit('user_typing', { 
      userId: user.id, 
      email: user.email,
      isTyping: true 
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('typing_stop')
  async handleTypingStop(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    const user = client.data.user;

    client.to(roomId).emit('user_typing', { 
      userId: user.id, 
      email: user.email,
      isTyping: false 
    });
  }

  // Method to send notification to specific user
  async sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit('notification', notification);
  }

  // Method to send message to specific room
  async sendMessageToRoom(roomId: string, message: any) {
    this.server.to(roomId).emit('system_message', message);
  }
}
