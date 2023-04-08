import express, { Request, Response } from 'express';

export const authRoutes = express.Router();

authRoutes.get('/login', async (req, res) => {
    res.json({ message: "This is the login route!" })
})
