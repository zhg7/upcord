import express from 'express';
import { authRoutes } from './auth.routes'
import { userRoutes } from './user.routes';
import { forumRoutes } from './forum.routes';

export const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/forums", forumRoutes);