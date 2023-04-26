import express, { Request, Response } from 'express';
import { emailExists, usernameExists, validateUserAccount } from "../services/user.service";

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

export async function activateUserAccount(req: Request, res: Response, userId: number) {
    await validateUserAccount(userId);
    return res
        .status(200)
        .json({ result: "account verified" });
}



