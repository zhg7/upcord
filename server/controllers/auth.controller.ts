import { Request, Response } from 'express';
import crypto from 'crypto';
import { storeSessionToken } from '../services/auth.service';
import { CookieOptions } from 'express-serve-static-core';
import { User } from '@prisma/client';
import { getUserBySessionToken } from '../services/user.service';

const COOKIE_NAME = 'uc_session';
const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
}

export async function createSessionCookie(req: Request, res: Response, user: User) {
    const DAYS_TO_EXPIRATION = 7;
    const sessionToken = crypto.randomBytes(30).toString('hex');
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + DAYS_TO_EXPIRATION);

    COOKIE_OPTIONS.expires = expirationDate;

    res.cookie(COOKIE_NAME, sessionToken, COOKIE_OPTIONS);

    storeSessionToken(sessionToken, user.id, expirationDate);

    return res
        .json({ login: 'successful', user: user });
}

export async function sendSessionUserDetails(req: Request, res: Response, sessionToken: string) {
    const user = await getUserBySessionToken(sessionToken)
    return res
        .status(200)
        .json(user)
}