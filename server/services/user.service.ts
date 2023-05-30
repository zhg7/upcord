import prisma from '../index';
import crypto from 'crypto';
import { SignUpUser } from '../types/signup.type';
import { getPasswordHash } from './auth.service';

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

export async function getAllUsers() {
    const users = await prisma.user.findMany({
        where: {
            createdAt: {
                gt: new Date(+0) // Ignorar usuarios 'eliminados';
            }
        },
        select: userData
    });

    return users;
}

export async function getUserByUsername(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username,
            createdAt: {
                gt: new Date(+0) // Ignorar usuarios 'eliminados';
            }
        },
        select: userData,
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

export async function updateUser(userId: number, username: string, email: string, password: string) {

    //Hasheo previo a guardar.
    if (password) {
        password = await getPasswordHash(password)
    };

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: username,
            email: email,
            password: password || undefined, // Campo opcional
        }
    })

    return user;
}

export async function updateUserStatus(userId: number, isActivated: boolean, isAdmin: boolean) {

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isActivated: isActivated,
            isAdmin: isAdmin
        }
    });

    return user;
}

export async function updateUserPassword(userId: number, password: string) {
    password = await getPasswordHash(password);

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: password,
        }
    });

    return user;
}

export async function addUserBan(targetUserId: number, authorUserId: number, reason: string, expiresAt: Date) {
    const ban = await prisma.ban.create({
        data: {
            targetUserId: targetUserId,
            authorId: authorUserId,
            reason: reason,
            expiresAt: expiresAt
        }
    });

    return ban;
}

export async function removeUserBan(banId: number) {
    const unban = await prisma.ban.delete({
        where: {
            id: banId
        }
    });

    return unban;
}

export async function getUserStats(username: string) {
    const likes = await prisma.like.count({
        where: {
            post: {
                author: {
                    username: username
                }
            }
        }

    });

    const threads = await prisma.thread.findMany({
        where: {
            author: {
                username: username
            }
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            subforum: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const comments = await prisma.post.findMany({
        where: {
            author: {
                username: username
            }
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            thread: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return {
        "likesReceived": likes,
        "threadsCreated": threads,
        "commentsSent": comments
    };
}

export async function removeUser(userId: number) {

    const randomUsername = `deleted${crypto.randomBytes(6).toString('hex')}`;
    const randomEmail = `deleted${crypto.randomBytes(12).toString('hex')}@deleted.upcord`;

    // Anonimizar usuario
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            username: randomUsername,
            email: randomEmail,
            avatar: null,
            biography: null,
            isActivated: false,
            createdAt: new Date(+0)
        }
    });

    // Anonomizar hilos y comentarios
    await prisma.thread.updateMany({
        where: {
            authorId: userId
        },
        data: {
            title: "***"
        }
    });

    await prisma.post.updateMany({
        where: {
            authorId: userId
        },
        data: {
            content: "***"
        }
    });

    // Eliminar mensajes de chat
    await prisma.message.deleteMany({
        where: {
            senderId: userId
        }
    });

    // Eliminar me gustas dados.
    await prisma.like.deleteMany({
        where: {
            authorId: userId
        }
    });

    // Eliminar tokens de verificación
    await prisma.verification.deleteMany({
        where: {
            userId: userId
        }
    });
}