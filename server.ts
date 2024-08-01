import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import clientPromise from './pages/lib/db';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const users: { [key: string]: { socketId: string; username: string } } = {};

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  clientPromise.then(() => {
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('login', (userData) => {
        const { userId, username } = userData;
        users[userId] = { socketId: socket.id, username };
        console.log(`User ${username} (ID: ${userId}) connected`);
        io.emit('userConnected', { userId, username });
      });

      socket.on('disconnect', () => {
        const userId = Object.keys(users).find(id => users[id].socketId === socket.id);
        if (userId) {
          const { username } = users[userId];
          delete users[userId];
          console.log(`User ${username} (ID: ${userId}) disconnected`);
          io.emit('userDisconnected', { userId, username });
        }
      });
    });

    server.all('*', (req: Request, res: Response) => handle(req, res));

    httpServer.listen(3000, (err?: any) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  }).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
});
