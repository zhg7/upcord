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
            posts: { // Obtener el autor de la respuesta más reciente.
                include: {
                    author: {
                        select: {
                            username: true,
                            avatar: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1
            }
        },

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