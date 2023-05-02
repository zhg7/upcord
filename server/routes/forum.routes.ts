import express, { Request, Response } from 'express';
import { getCategoryList } from '../controllers/forum.controller';

export const forumRoutes = express.Router();

forumRoutes.get('/categories', async (req: Request, res: Response) => {
    getCategoryList(req, res);
})