import { prisma } from '../index';

export async function addChat(userOneId: number, userTwoId: number) {
    const chat = await prisma.chat.create({
        data: {
            userOneId: userOneId,
            userTwoId: userTwoId,
        },
    });

    return chat;
}

export async function chatExists(userOneId: number, userTwoId: number) {
    const chat = await prisma.chat.findFirst({
        where: {
            OR: [
                {
                    userOneId: userOneId,
                    userTwoId: userTwoId
                },
                {
                    userOneId: userTwoId,
                    userTwoId: userOneId
                },
            ],
        },
    });

    return chat !== null;
}