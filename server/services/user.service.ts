import prisma from '../index';
import { SignUpUser } from '../types/signup.type';

const userData = {
    id: true,
    username: true,
    email: true,
    isAdmin: true,
    avatar: true,
    biography: true,
    createdAt: true,
    updatedAt: true,
    isActivated: true,
}

export async function getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: userData
    })
    return user;
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: userData
    })
    return user;
}

export async function getUserBySessionToken(sessionToken: string) {

    const user = await prisma.session.findUnique({
        where: {
            token: sessionToken,
        },
        select: {
            user: {
                select: userData,
            },
        },
    })
    return user;
}

export async function getUserByVerificationToken(verificationToken: string) {
    const user = await prisma.verification.findFirst({
        where: {
            token: verificationToken,
            expiresAt: {
                gte: new Date() // Asegurarse de que no está caducado.
            }
        },
        select: {
            user: {
                select: userData,
            }
        },
    })

    return user;
}

export async function validateUserAccount(userId: number) {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            isActivated: true
        },
    })
}

export async function addUser(newUser: SignUpUser) {

    await prisma.user.create({
        data: {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
        }
    })
}

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

export async function isUserActivated(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
            isActivated: true
        },
    })

    return user !== null;
}

export async function getUserBan(userId: number) {
    const ban = await prisma.ban.findFirst({
        where: {
            targetUserId: userId,
            expiresAt: {
                gte: new Date() // Comprobar si está en vigor
            }
        }
    })

    return ban;
}

export async function updateProfile(userId: number, avatar: string, biography: string) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            avatar: avatar,
            biography: biography,
        }
    })

    return user;
}