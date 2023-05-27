import prisma from '../index';
import type { Message } from '../types/message.type';

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

async function getMessageReceiver(message: Message) {
    const receiver = await prisma.chat.findFirst({
        where: {
            id: message.chatId,
            OR: [
                {
                    userOneId: message.senderId,
                },
                {
                    userTwoId: message.senderId
                },
            ],

        },
        select: {
            userOneId: true,
            userTwoId: true
        }
    })

    return Number(receiver?.userOneId === message.senderId ? receiver.userTwoId : receiver?.userOneId);
}


export async function addMessage(message: Message) {

    const receiverId = await getMessageReceiver(message)

    const newMessage = await prisma.message.create({
        data: {
            senderId: message.senderId,
            receiverId: receiverId,
            message: message.message,
            chatId: message.chatId
        },
    })
}

export async function getMessages(chatId: number) {
    const messages = await prisma.message.findMany({
        where: {
            chatId: chatId,
        },
        include: {
            receiver: {
                select: {
                    username: true,
                    avatar: true,
                }
            }
        }
    })

    return messages;
}


//Comprobar tanto si el bloqueo es emitido por el propio usuario o si es afectado por éste.
export async function isBlocked(userId: number, targetUserId: number) {
    const blocked = await prisma.block.findFirst({
        where: {
            blockedId: userId,
            blockerId: targetUserId
        }
    })

    const blockedBy = await prisma.block.findFirst({
        where: {
            blockedId: targetUserId,
            blockerId: userId
        }
    })

    return {
        blockedByMyself: blocked !== null,
        blockedBy: blockedBy !== null
    }
}

export async function addBlock(userId: number, blockedId: number) {

    const block = await prisma.block.create({
        data: {
            blockerId: userId,
            blockedId: blockedId
        }
    })

    return block;
}

export async function removeBlock(userId: number, blockedId: number) {

    const block = await prisma.block.deleteMany({
        where: {
            blockerId: userId,
            blockedId: blockedId
        }
    })

    return block;
}