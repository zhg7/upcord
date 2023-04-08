import express, { Request, Response } from 'express';
import { validateSignUpDetails } from '../middlewares/auth.middleware';

export const authRoutes = express.Router();

authRoutes.get('/login', async (req: Request, res: Response) => {
    res.json({ message: "This is the login route!" })
})

authRoutes.post('/signup', async (req, res) => {
    validateSignUpDetails(req, res);
})