import prisma from '../index';

export async function getCategories() {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            title: true,
            subforums: {
                select: {
                    id: true,
                    title: true,
                    logo: true,
                    description: true
                }
            }
        },
    })

    return categories;
}

export async function getThreads(subforumId: number) {
    const threads = await prisma.thread.findMany({
        where: {
            subforumId: subforumId,
        },
        include: {
            author: { // Obtener datos del autor.
                select: {
                    username: true,
                    avatar: true
                }
            },
            _count: {  // Contar número de respuestas.
                select: { posts: true }
            },
            posts: {
                include: {  // Obtener el autor de la respuesta más reciente.
                    author: {
                        select: {
                            username: true,
                            avatar: true
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1
            },
        },
        orderBy: [
            {
                isPinned: 'desc', // Primero los hilos fijados.
            },
            {
                updatedAt: 'desc' // Campo a actualizar al insertarse nuevos comentarios.
            }
        ]

    });

    return threads;
}

export async function getSubforum(subforumId: number) {
    const subforum = await prisma.subforum.findUnique({
        where: {
            id: subforumId,
        }
    })

    return subforum;
}

export async function addThread(title: string, content: string, subforumId: number, authorId: number) {
    const thread = await prisma.thread.create({
        data: {
            title: title,
            authorId: authorId,
            subforumId: subforumId,
        }
    })
    await addComment(content, thread.id, authorId);
    return thread;
}

export async function addComment(content: string, threadId: number, authorId: number) {
    const comment = await prisma.post.create({
        data: {
            content: content,
            authorId: authorId,
            threadId: threadId
        }
    })

    await setThreadLastUpdate(threadId);

    return comment;
}

export async function getThread(threadId: number) {
    const thread = await prisma.thread.findUnique({
        where: {
            id: threadId,
        },
        include: {
            subforum: {
                select: {
                    title: true,
                    id: true,
                }
            }
        }
    });

    return thread;
}

export async function getComments(threadId: number) {
    const comments = await prisma.post.findMany({
        where: {
            threadId: threadId,
        }
    })

    return comments;
}

export async function getComment(commentId: number) {
    const comment = await prisma.post.findUnique({
        where: {
            id: commentId
        },
        include: {
            author: {
                select: {
                    username: true,
                    avatar: true
                }
            }
        }
    })

    return comment;
}

export async function updateComment(commentId: number, content: string) {
    const comment = await prisma.post.update({
        where: {
            id: commentId,
        },
        data: {
            content: content
        }
    })

    return comment;
}

export async function addReply(content: string, threadId: number, authorId: number, parentPostId: number) {
    const reply = await prisma.post.create({
        data: {
            content: content,
            authorId: authorId,
            threadId: threadId,
            parentPostId: parentPostId
        }
    });

    await setThreadLastUpdate(threadId);

    return reply;
}

export async function getReplies(commentId: number) {
    const replies = await prisma.post.findMany({
        where: {
            parentPostId: commentId
        }
    });

    return replies;
}

export async function setThreadLastUpdate(threadId: number) {
    const thread = await prisma.thread.update({
        where: {
            id: threadId,
        },
        data: {
            updatedAt: new Date(),
        }
    })

    return thread;
}

export async function getForumStats() {
    const users = await prisma.user.aggregate({
        _count: {
            id: true
        }
    });

    const threads = await prisma.thread.aggregate({
        _count: {
            id: true
        }
    });

    const comments = await prisma.post.aggregate({
        _count: {
            id: true
        }
    });

    const messages = await prisma.message.aggregate({
        _count: {
            id: true
        }
    });

    return {
        "users": users._count.id,
        "threads": threads._count.id,
        "comments": comments._count.id,
        "messages": messages._count.id
    };
}