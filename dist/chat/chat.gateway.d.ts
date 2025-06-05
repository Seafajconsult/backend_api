import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto, JoinRoomDto } from './dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Server;
    private readonly logger;
    private connectedUsers;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(joinRoomDto: JoinRoomDto, client: Socket): Promise<void>;
    handleSendMessage(sendMessageDto: SendMessageDto, client: Socket): Promise<void>;
    handleLeaveRoom(data: {
        roomId: string;
    }, client: Socket): Promise<void>;
    handleTypingStart(data: {
        roomId: string;
    }, client: Socket): Promise<void>;
    handleTypingStop(data: {
        roomId: string;
    }, client: Socket): Promise<void>;
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    sendMessageToRoom(roomId: string, message: any): Promise<void>;
}
