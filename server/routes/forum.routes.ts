import express, { Request, Response } from 'express';
import { getForumList } from '../controllers/forum.controller';

export const forumRoutes = express.Router();

forumRoutes.get('/', async (req: Request, res: Response) => {
    getForumList(req, res);
})