import { prisma } from '../index';

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
    const comment = prisma.post.create({
        data: {
            content: content,
            authorId: authorId,
            threadId: threadId
        }
    })

    return comment;
}