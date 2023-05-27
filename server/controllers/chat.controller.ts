import { Request, Response } from 'express';
import { getUsersChat, addChat, getUserChats, getMessages, isBlocked, addBlock, removeBlock } from '../services/chat.service';
import { isSessionTokenValid } from '../services/auth.service';
import { getUserBySessionToken, getUserByUsername } from '../services/user.service';

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

export async function checkBlock(req: Request, res: Response) {
    const blockerUsername = req.params.username;
    const sessionToken = req.cookies.uc_session;

    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);
        const blockerUser = await getUserByUsername(blockerUsername);
        const blocked = await isBlocked(Number(blockerUser?.id), Number(user?.user.id));

        return res
            .status(200)
            .json({ blocked: blocked });

    } else {
        return res
            .status(403)
            .end();
    }
}

export async function handleBlock(req: Request, res: Response) {
    const blockedId = req.body.userId;
    const sessionToken = req.cookies.uc_session;


    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);
        let block;

        if (req.method === "POST") {
            block = await addBlock(Number(user?.user.id), blockedId);
        } else if (req.method === "DELETE") {
            block = await removeBlock(Number(user?.user.id), blockedId);
        }

        return res
            .status(200)
            .json(block);
    } else {
        return res
            .status(403)
            .end();
    }
};
