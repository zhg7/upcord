import express, { Request, Response } from 'express';
import { validateSignUpDetails, validateLoginDetails } from '../middlewares/auth.middleware';

export const authRoutes = express.Router();

authRoutes.post('/login', async (req: Request, res: Response) => {
    validateLoginDetails(req, res);
})

authRoutes.post('/signup', async (req, res) => {
    validateSignUpDetails(req, res);
})