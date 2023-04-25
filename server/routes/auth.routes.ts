import express, { Request, Response } from 'express';
import { validateSignUpDetails, validateLoginDetails, validateSessionToken, validateVerificationToken } from '../middlewares/auth.middleware';
import { destroySession } from '../controllers/auth.controller';

export const authRoutes = express.Router();

authRoutes.post('/login', async (req: Request, res: Response) => {
    validateLoginDetails(req, res);
})

authRoutes.post('/signup', async (req, res) => {
    validateSignUpDetails(req, res);
})

authRoutes.get('/logout', async(req, res) => {
    destroySession(req, res);
})

authRoutes.get('/', async (req, res) => {
    validateSessionToken(req, res);
})

authRoutes.get("/confirm/:token", async(req, res) => {
    validateVerificationToken(req, res);
})