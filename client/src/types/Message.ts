export type Message = {
    senderId: number;
    senderUsername : string;
    senderAvatar : string;
    message: string;
    chatId: number;
    createdAt: Date;
}