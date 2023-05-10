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
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});


// Socket.io
export const io = new Server(server,
  {
    cors: {
      origin: "*"
    }
  });

io.on("connection", (socket) => {
  socket.on('join', (chatId) => {
  
    socket.join(chatId);

    socket.on('message', function (message) {
      socket.to(chatId).emit('message', message);

      addMessage({
        senderId: message.senderId,
        message: message.message,
        chatId: message.chatId
      })

    });

  });




})


