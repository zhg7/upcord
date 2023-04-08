import { Request, Response } from 'express';
import { z } from 'zod';
import { SignUpUser } from '../types/user.type';
import { createUser } from '../controllers/auth.controller';


export async function validateSignUp(req: Request, res: Response) {
    try {
        const user = SignUpUser.parse(req.body)
        createUser(user)
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res
                .status(400)
                .json(err.issues.map((issue) => ({ field: issue.path[0], message: issue.message })));
        }
    }
}
