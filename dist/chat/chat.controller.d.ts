import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getUserChatRooms(req: any): Promise<{
        id: string;
        name: string;
        type: string;
        participants: string[];
    }[]>;
    getChatRoomDetails(roomId: string, req: any): Promise<{
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
    getRoomMessages(roomId: string, limit: string | undefined, req: any): Promise<({
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
    sendMessage(roomId: string, body: {
        content: string;
    }, req: any): Promise<{
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
    markMessagesAsRead(roomId: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    test(): Promise<{
        message: string;
        timestamp: string;
        websocket: {
            namespace: string;
            events: string[];
        };
        endpoints: string[];
    }>;
}
