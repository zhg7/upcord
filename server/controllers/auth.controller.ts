import { Request, Response } from 'express';
import crypto from 'crypto';
import { storeSessionToken, deleteSessionTokens } from '../services/auth.service';
import { CookieOptions } from 'express-serve-static-core';

const COOKIE_NAME = 'uc_session';
const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
}

export async function createSessionCookie(req: Request, res: Response, userId: number) {
    const DAYS_TO_EXPIRATION = 7;
    const sessionToken = crypto.randomBytes(30).toString('hex');
    const expirationDate = new Date();

    res = invalidateExistingSessions(res, userId);

    expirationDate.setDate(expirationDate.getDate() + DAYS_TO_EXPIRATION);

    COOKIE_OPTIONS.expires = expirationDate;

    res.cookie(COOKIE_NAME, sessionToken, COOKIE_OPTIONS);

    storeSessionToken(sessionToken, userId, expirationDate);

    return res
        .json({ login: 'successful' });
}

// Evitar que exista más de un token de sesión para un mismo usuario.
function invalidateExistingSessions(res: Response, userId: number) : Response {
    deleteSessionTokens(userId);
    COOKIE_OPTIONS.expires = new Date(0);
    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
    return res;
}