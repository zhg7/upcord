import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '@prisma/client';
import { SignUpUser } from '../types/signup.type';
import { emailExists, usernameExists } from '../services/user.service';
import { loginCredentialsMatches, getPasswordHash, isSessionTokenValid } from '../services/auth.service';
import { getUserByEmail, getUserByVerificationToken, addUser, validateUserAccount, isUserActivated } from '../services/user.service';
import { createEmailConfirmation, createSessionCookie, sendSessionUserDetails } from '../controllers/auth.controller';


export async function validateSignUpDetails(req: Request, res: Response) {
    try {
        const newUser = SignUpUser.parse(req.body)
        const isEmailDuplicated = await emailExists(newUser.email)
        const isUsernameDuplicated = await usernameExists(newUser.username)
        if (!isEmailDuplicated && !isUsernameDuplicated) {
            newUser.password = await getPasswordHash(newUser.password);;
            await addUser(newUser);
            createEmailConfirmation(req, res, newUser)
        }

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res
                .status(400)
                .json(err.issues.map((issue) => ({ field: issue.path[0], message: issue.message })));
        }
    }
}

export async function validateLoginDetails(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    if (await loginCredentialsMatches(email, password)) {
        
        if (!await isUserActivated(email)) {
            return res
                .status(401)
                .json({ login: 'unverified' });
        }

        const user = await getUserByEmail(email);
        if (user) {
            createSessionCookie(req, res, user as User)
        }

    } else {
        return res
            .status(401)
            .json({ login: 'failed' });
    }
}

export async function validateSessionToken(req: Request, res: Response) {
    const token = req.cookies.uc_session;
    if (token && await isSessionTokenValid(token)) {
        sendSessionUserDetails(req, res, token);
    } else {
        return res
            .status(418)
            .end();
    }
}

export async function validateVerificationToken(req: Request, res: Response) {
    const token = req.params.token;
    const result = await getUserByVerificationToken(token);
    if (result?.user) {
        await validateUserAccount(result.user.id);
        return res
            .status(200)
            .json({ result: "account verified" });
    } else {
        return res
            .status(400)
            .json({ result: "invalid token" });
    }
}


