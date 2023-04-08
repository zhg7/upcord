import { prisma } from '../models/connection';
import { SignUpUser } from '../types/user.type';

export async function insertUser(newUser: SignUpUser) {

    const user = await prisma.user.create({
        data: {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
        }
    })
}

