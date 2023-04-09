import { prisma } from '../index';
import { SignUpUser } from '../types/signup.type';

export async function getUserIdByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true
        }
    })

    return user?.id ?? 0;

}

export async function addUser(newUser: SignUpUser) {

    const user = await prisma.user.create({
        data: {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
        }
    })

    console.log(user);
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