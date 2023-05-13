import express, { Request, Response } from 'express';
import { getCategoryList, getThreadList, getSubforumDetails, createThread, getThreadDetails, getCommentList, getCommentDetails } from '../controllers/forum.controller';

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

forumRoutes.get('/threads/thread/:threadId', async (req: Request, res: Response) => {
    getThreadDetails(req, res);
})

forumRoutes.get('/comments/:threadId', async (req: Request, res: Response) => {
    getCommentList(req, res);
})

forumRoutes.get('/comments/comment/:commentId', async (req: Request, res: Response) => {
    getCommentDetails(req, res);
})

forumRoutes.post('/threads', async (req: Request, res: Response) => {
    createThread(req, res);
})
