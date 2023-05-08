import { Request, Response } from 'express';
import { chatExists, addChat } from '../services/chat.service';

export async function createChat(req: Request, res: Response) {
    const userOneId = Number(req.body.userOneId);
    const userTwoId = Number(req.body.userTwoId);

    if (!await chatExists(userOneId, userTwoId)) {
        await addChat(userOneId, userTwoId);
        return res
            .status(200)
            .end();
    } else {
        return res
            .status(409)
            .end()
    }
}