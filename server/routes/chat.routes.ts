import express, { Request, Response } from 'express';
import { createChat, getChats, getChatMessages, checkBlock, handleBlock } from '../controllers/chat.controller';

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

chatRoutes.get('/blocks/:username', async (req: Request, res: Response) => {
    checkBlock(req, res);
})

chatRoutes.post('/blocks', async (req: Request, res: Response) => {
    handleBlock(req, res);
})

chatRoutes.delete('/blocks', async (req: Request, res: Response) => {
    handleBlock(req, res);
})
