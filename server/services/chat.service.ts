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

export async function getUsersChat(userOneId: number, userTwoId: number) {
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

    console.log(chat)
    return chat;
}

export async function getUserChats(userId: number) {
    const chats = await prisma.chat.findMany({
        where: {
            OR: [
                {
                    userOneId: userId,
                },
                {
                    userTwoId: userId
                },
            ],
        },
        include: {
            userOne: {
                select: {
                    username: true,
                    avatar: true
                }
            },
            userTwo: {
                select: {
                    username: true,
                    avatar: true
                }
            },

        }
    });

    return chats;

}