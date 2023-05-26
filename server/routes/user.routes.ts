import express, { Request, Response } from 'express';
import { getUsers, checkDuplicateEmail, checkDuplicateUsername, getUserDetails, getStats, editProfileDetails, editUserDetails, editUserDataAsAdmin, retrieveUserBan, createUserBan, deleteUserBan, deleteUser } from '../controllers/user.controller';

export const userRoutes = express.Router();

userRoutes.get('/', async (req: Request, res: Response) => {
    getUsers(req, res);
})

userRoutes.get('/emails/:email', async (req: Request, res: Response) => {
    checkDuplicateEmail(req, res);
})

userRoutes.get('/usernames/:username', async (req: Request, res: Response) => {
    checkDuplicateUsername(req, res);
})

userRoutes.get('/:username', async (req: Request, res: Response) => {
    getUserDetails(req, res);
})

userRoutes.get('/bans/:username', async (req: Request, res: Response) => {
    retrieveUserBan(req, res);
})

userRoutes.get('/stats/:username', async (req: Request, res: Response) => {
    getStats(req, res);
})

userRoutes.post('/profiles', async (req: Request, res: Response) => {
    editProfileDetails(req, res);
})

userRoutes.post('/', async (req: Request, res: Response) => {
    editUserDetails(req, res);
})

userRoutes.post('/bans', async (req: Request, res: Response) => {
    createUserBan(req, res);
})

userRoutes.post('/admin/manager', async (req: Request, res: Response) => {
    editUserDataAsAdmin(req, res);
})

userRoutes.delete('/bans', async (req: Request, res: Response) => {
    deleteUserBan(req, res);
})

userRoutes.delete('/', async (req: Request, res: Response) => {
    deleteUser(req, res);
})
