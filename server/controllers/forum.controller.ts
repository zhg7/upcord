import express, { Request, Response } from 'express';
import { getCategories, getThreads, getSubforum, addThread, getThread, getComments, getComment, addComment, updateComment, addReply, getReplies } from "../services/forum.service";
import { getUserBySessionToken } from '../services/user.service';
import { isSessionTokenValid } from '../services/auth.service';

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
    const { title, content, subforumId } = req.body;
    const sessionToken = req.cookies.uc_session;
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);
        const thread = await addThread(title, content, Number(subforumId), Number(user?.user.id));

        return res
            .status(200)
            .json(thread);

    } else {
        return res
            .status(403)
            .end();
    }

}

export async function getThreadDetails(req: Request, res: Response) {
    const threadId = Number(req.params.threadId);
    if (!isNaN(threadId)) {
        const subforum = await getThread(threadId);
        return res
            .status(200)
            .json(subforum);
    } else {
        return res
            .status(400)
            .end();
    }
}

export async function getCommentList(req: Request, res: Response) {
    const threadId = Number(req.params.threadId);
    const comments = await getComments(threadId);
    return res
        .status(200)
        .json(comments);

}

export async function getCommentDetails(req: Request, res: Response) {
    const commentId = Number(req.params.commentId);
    const comment = await getComment(commentId);
    return res
        .status(200)
        .json(comment);
}

export async function createComment(req: Request, res: Response) {
    const { content, threadId } = req.body;
    const sessionToken = req.cookies.uc_session;
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);
        const comment = await addComment(content, threadId, Number(user?.user.id));

        return res
            .status(200)
            .json(comment);


    } else {
        return res
            .status(403)
            .end();
    }

}

export async function editComment(req: Request, res: Response) {
    const { content, commentId } = req.body;
    const sessionToken = req.cookies.uc_session;
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        if (!isNaN(commentId)) {
            const comment = await updateComment(Number(commentId), content);
            return res
                .status(200)
                .json(comment);
        } else {
            return res
                .status(400)
                .end();
        }
    } else {
        return res
            .status(403)
            .end();
    }
}

export async function createReply(req: Request, res: Response) {
    const { content, threadId, parentPostId } = req.body;
    const sessionToken = req.cookies.uc_session;
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);
        const reply = await addReply(content, threadId, Number(user?.user.id), parentPostId);

        return res
            .status(200)
            .json(reply);


    } else {
        return res
            .status(403)
            .end();
    }


}

export async function getReplyList(req: Request, res: Response) {
    const commentId = Number(req.params.commentId);
    const replies = await getReplies(commentId);
    return res
        .status(200)
        .json(replies);
}