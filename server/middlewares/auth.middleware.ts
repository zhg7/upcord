import { Request, Response } from 'express';
import { z } from 'zod';
import { SignUpUser } from '../types/user.type';
import { createUser } from '../controllers/user.controller';
import { emailExists, usernameExists } from '../services/user.service';


export async function validateSignUpDetails(req: Request, res: Response) {
    try {
        const newUser = SignUpUser.parse(req.body)
        const isEmailDuplicated = await emailExists(newUser.email)
        const isUsernameDuplicated = await usernameExists(newUser.username)
        if (!isEmailDuplicated && !isUsernameDuplicated) {
            createUser(req, res, newUser)
        }

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res
                .status(400)
                .json(err.issues.map((issue) => ({ field: issue.path[0], message: issue.message })));
        }
    }
}
