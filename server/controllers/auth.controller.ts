import { Request, Response } from 'express';
import crypto from 'crypto';

export async function createSessionCookie(req: Request, res: Response, userId: number) {
    const DAYS_TO_EXPIRATION = 7;
    const sessionToken = crypto.randomBytes(30).toString('hex');
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + DAYS_TO_EXPIRATION);

    res.cookie('uc_session', sessionToken, {
        httpOnly: true,
        secure: false,
        expires: expirationDate,
        sameSite: 'lax'
    });
    return res
    .json({ login: 'successful'});
}