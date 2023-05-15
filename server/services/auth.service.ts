import prisma from '../index';
import bcrypt from 'bcrypt';
import { getUserByEmail } from './user.service';

export async function loginCredentialsMatches(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    })

    if (!user) {
        return false;
    }

    return await passwordHashMatches(password, user.password);
}

export async function getPasswordHash(plaintextPassword: string) {
    const SALT_ROUNDS = 10; // Cantidad de sal
    return await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
}

async function passwordHashMatches(plaintextPassword: string, hash: string) {
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
export async function isSessionTokenValid(sessionToken: string) {
    const session = await prisma.session.findFirst({
        where: {
            token: sessionToken,
            expiresAt: {
                gte: new Date()
            }
        }
    })

    return session !== null;
}

export async function removeSessionToken(sessionToken: string) {
    await prisma.session.delete({
        where: {
            token: sessionToken
        }
    })
}

export async function storeVerificationToken(vericationToken: string, expirationDate: Date, email: string, type: number) {
    // 0 = verificación email; 1 = recuperación contraseña
    const user = await getUserByEmail(email);

    await prisma.verification.create({
        data: {
            userId: user?.id as number,
            type: type,
            token: vericationToken,
            expiresAt: expirationDate
        }
    })
}
