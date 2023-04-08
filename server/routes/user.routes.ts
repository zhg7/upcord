import express, { Request, Response } from 'express';
import { validateSignUp } from '../middlewares/auth.middleware';
import { checkEmail } from '../controllers/user.controller';

export const userRoutes = express.Router();

userRoutes.get('/emails/:email', async (req: Request, res: Response) => {
    checkEmail(req, res);
})

userRoutes.post('/signup', async (req, res) => {
    validateSignUp(req, res);
})