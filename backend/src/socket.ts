import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

let io: SocketIOServer;

export function initSocket(httpServer: HttpServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  // Auth middleware
  io.use((socket: Socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie ?? '';
    const cookies = parse(cookieHeader);
    const token = cookies['token'];

    if (!token) return next(new Error('Unauthorized'));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      (socket as any).userId = payload.userId;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = (socket as any).userId as string;
    console.log('USER CONNECTED', userId);
    
    // Each user joins their own private room
    socket.join(`user:${userId}`);

    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED', userId);
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
}
