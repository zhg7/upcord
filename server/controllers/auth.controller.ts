import { Request, Response } from 'express';
import crypto from 'crypto';

export async function createSessionCookie(req: Request, res: Response, userId: number) {
    const sessionToken = crypto.randomBytes(30).toString('hex');
    res.cookie('uc_session', sessionToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7
    });
    res.send("OK!")
}