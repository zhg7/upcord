import type { User } from '@/types/Author';

export type Chat = {
    id: number,
    userOneId: number,
    userTwoId: number,
    createdAt: Date,
    updateAt: Date,
    userOne: User,
    userTwo: User
}

export type Message = {
    senderId: number;
    message: string;
    chatId: number;
    createdAt: Date;
}