import express from 'express';
import { authRoutes } from './auth.routes'

export const routes = express.Router();

routes.use(authRoutes);