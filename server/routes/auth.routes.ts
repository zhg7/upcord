import express, { Request, Response } from 'express';
import { validateSignUp } from '../middlewares/auth.middleware';

export const authRoutes = express.Router();

authRoutes.get('/login', async (req: Request, res: Response) => {
    res.json({ message: "This is the login route!" })
})

authRoutes.post('/signup', async (req, res) => {
    validateSignUp(req, res);
})