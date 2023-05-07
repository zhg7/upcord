import express, { Request, Response } from 'express';
import { getCategories, getThreads, getSubforum, addThread } from "../services/forum.service";

export async function getCategoryList(req: Request, res: Response) {
    const categories = await getCategories();
    return res
        .status(200)
        .json(categories);
}

export async function getThreadList(req: Request, res: Response) {
    const subforumId = Number(req.params.subforumId);
    const threads = await getThreads(subforumId);
    return res
        .status(200)
        .json(threads);
}

export async function getSubforumDetails(req: Request, res: Response) {
    const subforumId = Number(req.params.subforumId);
    if (!isNaN(subforumId)) { // Evitar carácteres extraños.
        const subforum = await getSubforum(subforumId);
        return res
            .status(200)
            .json(subforum);
    } else {
        return res
            .status(200)
            .end();
    }

}

export async function createThread(req: Request, res: Response) {
    const { title, content, subforumId, authorId } = req.body;
    const thread = await addThread(title, content, Number(subforumId), Number(authorId));

    if (thread) {
        return res
            .status(200)
            .json(thread);
    } else {
        return res
            .status(400)
            .end();
    }

}