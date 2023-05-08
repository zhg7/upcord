import express, { Request, Response } from 'express';
import { createChat } from '../controllers/chat.controller';

export const chatRoutes = express.Router();

chatRoutes.post('/', async (req: Request, res: Response) => {
    createChat(req, res);
})