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
    const SALT_ROUNDS = 10; // Cantidad de sal
    return await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
}

async function passwordMatches(plaintextPassword: string, hash: string) {
    return await bcrypt.compare(plaintextPassword, hash);
}

export async function storeSessionToken(sessionToken: string, userId: number, expirationDate: Date) {
    await prisma.session.create({
        data: {
            token: sessionToken,
            userId: userId,
            expiresAt: expirationDate,
        }
    })
}

// Verificar si el token no ha expirado o si no existe simplemente.
export async function isTokenValid(sessionToken: string) {
    const session = prisma.session.findFirst({
        where: {
            token: sessionToken,
            expiresAt: {
                gte: new Date()
            }
        }
    })

    return await session !== null;
}

