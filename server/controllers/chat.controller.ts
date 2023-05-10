import { Request, Response } from 'express';
import { getUsersChat, addChat, getUserChats, getMessages } from '../services/chat.service';

export async function createChat(req: Request, res: Response) {
    const userOneId = Number(req.body.userOneId);
    const userTwoId = Number(req.body.userTwoId);
    const chat = await getUsersChat(userOneId, userTwoId)

    if (!chat) {
        await addChat(userOneId, userTwoId);
    }

    return res
        .status(200)
        .json(chat);
}

export async function getChats(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const chats = await getUserChats(userId);

    return res
        .status(200)
        .json(chats);
}

export async function getChatMessages(req: Request, res: Response) {
    const chatId = Number(req.params.chatId);
    const messages = await getMessages(chatId);

    return res
        .status(200)
        .json(messages);
}