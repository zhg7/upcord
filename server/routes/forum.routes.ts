import express, { Request, Response } from 'express';
import { getCategoryList, getThreadList, getSubforumDetails, editSubforum, createThread, getThreadDetails, getCommentList, getCommentDetails, createComment, editComment, editThread, createReply, getReplyList, getStats, handleLike } from '../controllers/forum.controller';

export const forumRoutes = express.Router();

forumRoutes.get('/stats', async (req: Request, res: Response) => {
    getStats(req, res);
})

forumRoutes.get('/categories', async (req: Request, res: Response) => {
    getCategoryList(req, res);
})

forumRoutes.get('/threads/:subforumId', async (req: Request, res: Response) => {
    getThreadList(req, res);
})

forumRoutes.get('/:subforumId', async (req: Request, res: Response) => {
    getSubforumDetails(req, res);
})

forumRoutes.post('/', async (req: Request, res: Response) => {
    editSubforum(req, res);
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

forumRoutes.get('/replies/:commentId', async (req: Request, res: Response) => {
    getReplyList(req, res);
})

forumRoutes.post('/threads', async (req: Request, res: Response) => {
    createThread(req, res);
})

forumRoutes.post('/threads/thread', async (req: Request, res: Response) => {
    editThread(req, res);
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

forumRoutes.post('/likes', async (req: Request, res: Response) => {
    handleLike(req, res);
})

forumRoutes.delete('/likes', async (req: Request, res: Response) => {
    handleLike(req, res);
})


