export declare class SendMessageDto {
    roomId: string;
    content: string;
}
export declare class JoinRoomDto {
    roomId: string;
}
export declare class CreateRoomDto {
    name: string;
    type?: string;
    participants?: string[];
}
