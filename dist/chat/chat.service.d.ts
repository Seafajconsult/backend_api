import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export interface CreateMessageDto {
    content: string;
    senderId: string;
    roomId: string;
}
export declare class ChatService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    verifySocketToken(token: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        status: import(".prisma/client").$Enums.UserStatus;
    } | null>;
    verifyRoomAccess(userId: string, roomId: string): Promise<boolean>;
    createMessage(createMessageDto: CreateMessageDto): Promise<{
        sender: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
        };
    } & {
        content: string;
        id: string;
        createdAt: Date;
        roomId: string;
        senderId: string;
    }>;
    getRoomMessages(roomId: string, limit?: number): Promise<({
        sender: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
        };
    } & {
        content: string;
        id: string;
        createdAt: Date;
        roomId: string;
        senderId: string;
    })[]>;
    getUserChatRooms(userId: string): Promise<{
        id: string;
        name: string;
        type: string;
        participants: string[];
    }[]>;
    getChatRoomDetails(roomId: string, userId: string): Promise<{
        messages: ({
            sender: {
                email: string;
                role: import(".prisma/client").$Enums.UserRole;
                id: string;
            };
        } & {
            content: string;
            id: string;
            createdAt: Date;
            roomId: string;
            senderId: string;
        })[];
        name: string;
        type: string;
        roomId: string;
    }>;
    markMessagesAsRead(roomId: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
