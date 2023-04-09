import { prisma } from '../index';
import bcrypt from 'bcrypt';

export async function checkLoginCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    })

    if (!user) {
        return false;
    }

    return await isPasswordValid(password, user.password);
}

export async function getPasswordHash(plaintextPassword: string) {
    return await bcrypt.hash(plaintextPassword, 10); // Cantidad de sal
}

async function isPasswordValid(plaintextPassword: string, hash: string) {
    return await bcrypt.compare(plaintextPassword, hash);
}