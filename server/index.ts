import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { routes } from './routes/index.routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});