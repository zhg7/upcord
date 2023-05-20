import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '@prisma/client';
import { SignUpUser } from '../types/signup.type';
import { loginCredentialsMatches, getPasswordHash, isSessionTokenValid } from '../services/auth.service';
import { emailExists, getUserBan, usernameExists, getUserByEmail, getUserByVerificationToken, addUser, isUserActivated, } from '../services/user.service';
import { createEmailConfirmation, createSessionCookie, sendSessionUserDetails } from '../controllers/auth.controller';
import { activateUserAccount, resetUserPassword } from '../controllers/user.controller';


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

        //Verificar si está expulsado.
        const user = await getUserByEmail(email);
        const possibleBan = await getUserBan(user?.id as number);

        if (possibleBan) {
            return res
                .status(403)
                .json({ login: 'banned', ban: possibleBan });
        }

        // Verificar si está verificado el correo.
        if (!await isUserActivated(email)) {
            return res
                .status(403)
                .json({ login: 'unverified' });
        }

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

export async function validateVerificationToken(req: Request, res: Response, isEmailActivation: boolean) {
    const token = req.params.token;
    const result = await getUserByVerificationToken(token);
    if (result?.user) {
        if (isEmailActivation) {
            activateUserAccount(req, res, result.user.id)
        } else {
            resetUserPassword(req, res, result.user.id);
        }

    } else {
        return res
            .status(400)
            .json({ result: "invalid token" });
    }
}


