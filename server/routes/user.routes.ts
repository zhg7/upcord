import express, { Request, Response } from 'express';
import { checkDuplicateEmail, checkDuplicateUsername, getUserDetails } from '../controllers/user.controller';

export const userRoutes = express.Router();

userRoutes.get('/emails/:email', async (req: Request, res: Response) => {
    checkDuplicateEmail(req, res);
})

userRoutes.get('/usernames/:username', async (req: Request, res: Response) => {
    checkDuplicateUsername(req, res);
})

userRoutes.get('/:username', async (req: Request, res: Response) => {
    getUserDetails(req, res);
}) 