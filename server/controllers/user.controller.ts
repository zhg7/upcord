import express, { Request, Response } from 'express';
import { emailExists, usernameExists } from "../services/user.service";

export async function checkEmail(req: Request, res: Response) {
    const email = req.params.email;
    const isEmailDuplicated = await emailExists(email);
    if (isEmailDuplicated) {
        return res
            .json(`Ya existe una cuenta con la dirección ${email}`);
    } else {
        return res
            .json(`${email} disponible`);
    }
}