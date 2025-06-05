import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SendMessageDto } from './dto';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'Get chat rooms for current user' })
  @ApiResponse({ status: 200, description: 'Chat rooms retrieved successfully' })
  async getUserChatRooms(@Request() req: any) {
    return this.chatService.getUserChatRooms(req.user.id);
  }

  @Get('rooms/:roomId')
  @ApiOperation({ summary: 'Get chat room details and messages' })
  @ApiResponse({ status: 200, description: 'Chat room details retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Access denied to this chat room' })
  async getChatRoomDetails(
    @Param('roomId') roomId: string,
    @Request() req: any,
  ) {
    return this.chatService.getChatRoomDetails(roomId, req.user.id);
  }

  @Get('rooms/:roomId/messages')
  @ApiOperation({ summary: 'Get messages for a chat room' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Access denied to this chat room' })
  async getRoomMessages(
    @Param('roomId') roomId: string,
    @Query('limit') limit: string = '50',
    @Request() req: any,
  ) {
    const hasAccess = await this.chatService.verifyRoomAccess(req.user.id, roomId);

    if (!hasAccess) {
      throw new Error('Access denied to this chat room');
    }

    return this.chatService.getRoomMessages(roomId, parseInt(limit));
  }

  @Post('rooms/:roomId/messages')
  @ApiOperation({ summary: 'Send a message to a chat room (REST endpoint)' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 403, description: 'Access denied to this chat room' })
  async sendMessage(
    @Param('roomId') roomId: string,
    @Body() body: { content: string },
    @Request() req: any,
  ) {
    const hasAccess = await this.chatService.verifyRoomAccess(req.user.id, roomId);

    if (!hasAccess) {
      throw new Error('Access denied to this chat room');
    }

    return this.chatService.createMessage({
      content: body.content,
      senderId: req.user.id,
      roomId,
    });
  }

  @Post('rooms/:roomId/read')
  @ApiOperation({ summary: 'Mark messages as read in a chat room' })
  @ApiResponse({ status: 200, description: 'Messages marked as read successfully' })
  @ApiResponse({ status: 403, description: 'Access denied to this chat room' })
  async markMessagesAsRead(
    @Param('roomId') roomId: string,
    @Request() req: any,
  ) {
    return this.chatService.markMessagesAsRead(roomId, req.user.id);
  }

  @Get('test')
  @ApiOperation({ summary: 'Test chat module' })
  @ApiResponse({ status: 200, description: 'Chat module is working' })
  async test() {
    return {
      message: 'Chat module is working correctly',
      timestamp: new Date().toISOString(),
      websocket: {
        namespace: '/chat',
        events: [
          'join_room',
          'send_message',
          'leave_room',
          'typing_start',
          'typing_stop',
        ],
      },
      endpoints: [
        'GET /chat/rooms',
        'GET /chat/rooms/:roomId',
        'GET /chat/rooms/:roomId/messages',
        'POST /chat/rooms/:roomId/messages',
        'POST /chat/rooms/:roomId/read',
      ],
    };
  }
}
