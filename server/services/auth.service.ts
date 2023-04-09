import { prisma } from '../index';
import bcrypt from 'bcrypt';

export async function loginCredentialsMatches(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    })

    if (!user) {
        return false;
    }

    return await passwordMatches(password, user.password);
}

export async function getPasswordHash(plaintextPassword: string) {
    return await bcrypt.hash(plaintextPassword, 10); // Cantidad de sal
}

async function passwordMatches(plaintextPassword: string, hash: string) {
    return await bcrypt.compare(plaintextPassword, hash);
}