import { prisma } from '../index';

export async function getForums() {
    const forums = await prisma.category.findMany({
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

    return forums;
}