import { Request, Response } from 'express';
import crypto from 'crypto';
import { storeSessionToken } from '../services/auth.service';
import { CookieOptions } from 'express-serve-static-core';
import { User } from '@prisma/client';
import { SignUpUser } from '../types/signup.type';
import { getUserBySessionToken } from '../services/user.service';
import { removeSessionToken, storeVerificationToken } from '../services/auth.service';
import { sendEmail } from '../utils/mailer';

const DAYS_TO_EXPIRATION = 7;
const COOKIE_NAME = 'uc_session';
const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
}

export async function createSessionCookie(req: Request, res: Response, user: User) {
    const sessionToken = crypto.randomBytes(30).toString('hex');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + DAYS_TO_EXPIRATION);
    COOKIE_OPTIONS.expires = expirationDate;

    res.cookie(COOKIE_NAME, sessionToken, COOKIE_OPTIONS);

    storeSessionToken(sessionToken, user.id, expirationDate);

    return res
        .json({ login: 'successful', user });
}

export async function sendSessionUserDetails(req: Request, res: Response, sessionToken: string) {
    const user = await getUserBySessionToken(sessionToken)
    return res
        .status(200)
        .json(user);
}

export async function destroySession(req: Request, res: Response) {
    const token = req.cookies.uc_session;
    if (token) {
        await removeSessionToken(token);
        res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
        return res
            .status(200)
            .end()
    } else {
        return res
            .status(400)
            .end();
    }
}

export async function createEmailConfirmation(req: Request, res: Response, user: SignUpUser) {
    const verificationToken = crypto.randomBytes(30).toString('hex');
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + DAYS_TO_EXPIRATION);

    const recipientEmail = user.email;

    await storeVerificationToken(verificationToken, expirationDate, user.email, 0) //0 = verificación email
    await sendEmail(recipientEmail, "Confirmación de cuenta", `${req.protocol}://${req.headers.host}/api/auth/confirm/${verificationToken}`);

    return res
        .status(200)
        .end();
}

