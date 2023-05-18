import express, { Request, Response } from 'express';
import { getCategoryList, getThreadList, getSubforumDetails, createThread, getThreadDetails, getCommentList, getCommentDetails, createComment, editComment, createReply, getReplyList } from '../controllers/forum.controller';

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

forumRoutes.get('/replies/:commentId', async (req: Request, res : Response) => {
    getReplyList(req, res);
})

forumRoutes.post('/threads', async (req: Request, res: Response) => {
    createThread(req, res);
})

forumRoutes.post('/comments', async (req: Request, res: Response) => {
    createComment(req, res);
})

forumRoutes.post('/comments/comment', async (req: Request, res: Response) => {
    editComment(req, res);
})

forumRoutes.post('/replies', async (req: Request, res: Response) => {
    createReply(req, res);
})


