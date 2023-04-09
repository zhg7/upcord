import { Request, Response } from 'express';
import { z } from 'zod';
import { SignUpUser } from '../types/signup.type';
import { createUser } from '../controllers/user.controller';
import { emailExists, usernameExists } from '../services/user.service';
import { loginCredentialsMatches, getPasswordHash } from '../services/auth.service';
import { getUserIdByEmail } from '../services/user.service';
import { createSessionCookie } from '../controllers/auth.controller';


export async function validateSignUpDetails(req: Request, res: Response) {
    try {
        const newUser = SignUpUser.parse(req.body)
        const isEmailDuplicated = await emailExists(newUser.email)
        const isUsernameDuplicated = await usernameExists(newUser.username)
        if (!isEmailDuplicated && !isUsernameDuplicated) {
            newUser.password = await getPasswordHash(newUser.password);;
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

export async function validateLoginDetails(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body)

    if (await loginCredentialsMatches(email, password)) {
        const userId = await getUserIdByEmail(email);
        if (userId !== 0) { // Si el id es 0 quiere decir que no existe.
            createSessionCookie(req, res, userId)
        }

    } else {
        return res
            .status(401)
            .json("Credenciales incorrectas.")
    }



}
