import express, { Request, Response } from 'express';
import { createChat, getChats, getChatMessages } from '../controllers/chat.controller';

export const chatRoutes = express.Router();

chatRoutes.post('/', async (req: Request, res: Response) => {
    createChat(req, res);
})

chatRoutes.get('/:userId', async (req: Request, res: Response) => {
    getChats(req, res);
})

chatRoutes.get('/messages/:chatId', async (req: Request, res: Response) => {
    getChatMessages(req, res);
})