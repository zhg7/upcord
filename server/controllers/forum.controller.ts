import express, { Request, Response } from 'express';
import { getForums } from "../services/forum.service";

export async function getForumList(req: Request, res: Response) {
    const forums = await getForums();
    if (forums) {
        return res
            .status(200)
            .json(forums);
    } else {
        return res
            .status(404)
            .end();
    }


}