import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import { routes } from './routes/index.routes'
import { addMessage } from './services/chat.service';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));
app.use("/api", routes);

const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});


// Chat Socket.io
export const io = new Server(server,
  {
    cors: {
      origin: "*"
    }
  });

io.on("connection", (socket) => {
  socket.on('join', (chatId) => {

    socket.join(chatId);
    socket.to(chatId).emit('online');

    socket.on('message', (message) => {
      socket.to(chatId).emit('message', message);

      addMessage({
        senderId: message.senderId,
        message: message.message,
        chatId: message.chatId
      })

    });

    socket.on("disconnect", () => {
      socket.to(chatId).emit('offline');
    })

  });


})

export default prisma;


