import express, { Request, Response } from 'express';
import { getCategoryList, getThreadList, getSubforumDetails, createThread } from '../controllers/forum.controller';

export const forumRoutes = express.Router();

forumRoutes.get('/categories', async (req: Request, res: Response) => {
    getCategoryList(req, res);
})

forumRoutes.get('/threads/:subforumId', async (req: Request, res: Response) => {
    getThreadList(req, res);
})

forumRoutes.get('/:subforumId', async (req: Request, res: Response) => {
    getSubforumDetails(req, res);
})

forumRoutes.post('/threads', async (req: Request, res: Response) => {
    createThread(req, res);
})