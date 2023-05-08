import express, { Request, Response } from 'express';
import { createChat, getChats } from '../controllers/chat.controller';

export const chatRoutes = express.Router();

chatRoutes.post('/', async (req: Request, res: Response) => {
    createChat(req, res);
})

chatRoutes.get('/:userId', async (req: Request, res: Response) => {
    getChats(req, res);
})