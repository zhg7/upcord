import express, { Request, Response } from 'express';
import { getCategories } from "../services/forum.service";

export async function getCategoryList(req: Request, res: Response) {
    const categories = await getCategories();
    if (categories) {
        return res
            .status(200)
            .json(categories);
    } else {
        return res
            .status(404)
            .end();
    }


}