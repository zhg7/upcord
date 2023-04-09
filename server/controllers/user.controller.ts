import express, { Request, Response } from 'express';
import { addUser, emailExists, usernameExists } from "../services/user.service";
import { SignUpUser } from '../types/user.type';

export async function createUser(req: Request, res: Response, newUser: SignUpUser) {
    addUser(newUser);
}

export async function checkDuplicateEmail(req: Request, res: Response) {
    const email = req.params.email;
    const isEmailDuplicated = await emailExists(email);
    return res
        .json({ email: email, exists: isEmailDuplicated });
}

export async function checkDuplicateUsername(req: Request, res: Response) {
    const username = req.params.username;
    const isUsernameDuplicate = await usernameExists(username);
    return res
        .json({ username: username, exists: isUsernameDuplicate });
}

