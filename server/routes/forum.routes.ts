import express, { Request, Response } from 'express';
import { getCategoryList, getThreadList, getSubforumDetails } from '../controllers/forum.controller';

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