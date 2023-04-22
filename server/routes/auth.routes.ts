import express, { Request, Response } from 'express';
import { validateSignUpDetails, validateLoginDetails, validateSessionToken } from '../middlewares/auth.middleware';

export const authRoutes = express.Router();

authRoutes.post('/login', async (req: Request, res: Response) => {
    validateLoginDetails(req, res);
})

authRoutes.post('/signup', async (req, res) => {
    validateSignUpDetails(req, res);
})

authRoutes.get('/', async (req, res) => {
    validateSessionToken(req, res);
})