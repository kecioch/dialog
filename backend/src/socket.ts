import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { prisma } from './lib/prisma';

let io: SocketIOServer;

const onlineUsers = new Set<string>();

export function isUserOnline(userId: string) {
  return onlineUsers.has(userId);
}

export function getOnlineUsers() {
  return onlineUsers;
}

export function initSocket(httpServer: HttpServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST'],
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
    onlineUsers.add(userId);
    io.emit('user_status', { userId, online: true, lastSeen: null });

    // Disconnect user
    socket.on('disconnect', async () => {
      console.log('USER DISCONNECTED', userId);
      onlineUsers.delete(userId);

      // Update last seen in db
      const now = new Date();
      await prisma.user.update({
        where: { id: userId },
        data: { lastSeenAt: now },
      });

      // Send event
      io.emit('user_status', {
        userId,
        online: false,
        lastSeen: now.toISOString(),
      });
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
}
