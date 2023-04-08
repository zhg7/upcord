import { prisma } from '../models/connection';

export async function emailExists(email: string) {
    const emailAddress = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true
        }
    })

    return emailAddress !== null;
}

export async function usernameExists(username: string) {
    const userName = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true
        }
    })

    return userName !== null;
}