import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// GET /contacts — browse all users except yourself
router.get(
  '/contacts',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const users = await prisma.user.findMany({
      where: { id: { not: userId } },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
    res.json(users);
  }),
);

// GET /chats — list chats where current user hasn't deleted
router.get(
  '/chats',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;

    const chats = await prisma.chat.findMany({
      where: {
        users: { some: { userId, deletedAt: null } },
      },
      include: {
        users: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true } },
          },
        },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        _count: {
          select: {
            messages: {
              where: { fromId: { not: userId }, read: false },
            },
          },
        },
      },
    });

    const result = chats
      .map((chat) => ({
        id: chat.id,
        createdAt: chat.createdAt,
        users: chat.users,
        lastMessage: chat.messages[0] ?? null,
        unreadCount: chat._count.messages,
      }))
      .sort((a, b) => {
        // Unread chats first
        if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
        if (a.unreadCount === 0 && b.unreadCount > 0) return 1;

        // Then by last message date, newest first
        const dateA = a.lastMessage?.createdAt ?? a.createdAt;
        const dateB = b.lastMessage?.createdAt ?? b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });

    res.json(result);
  }),
);

// POST /chats/open — get or create chat with a user, returns chat
router.post('/chats/open', requireAuth, async (req, res) => {
  const { targetUserId } = req.body;
  const currentUserId = req.user?.userId;

  const include = {
    users: {
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    },
    messages: {
      orderBy: { createdAt: 'desc' as const },
      take: 1,
      include: {
        from: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    },
    _count: {
      select: {
        messages: {
          where: { fromId: { not: currentUserId }, read: false },
        },
      },
    },
  };

  let chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { users: { some: { userId: currentUserId } } },
        { users: { some: { userId: targetUserId } } },
      ],
    },
    include,
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        users: {
          create: [{ userId: currentUserId }, { userId: targetUserId }],
        },
      },
      include,
    });
  }

  const chatData = {
    id: chat.id,
    users: chat.users,
    createdAt: chat.createdAt,
    lastMessage: chat.messages[0] ?? null,
    unreadCount: chat._count.messages,
  };

  res.json(chatData);
});

// GET /chats/:chatId/messages — fetch messages respecting visibleFrom
router.get('/chats/:chatId/messages', requireAuth, async (req, res) => {
  const chatId = req.params.chatId as string;
  const userId = req.user!.userId;

  const member = await prisma.chatUser.findUnique({
    where: { chatId_userId: { chatId, userId } },
  });

  if (!member || member.deletedAt) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const messages = await prisma.chatMessage.findMany({
    where: {
      chatId,
      ...(member.visibleFrom ? { createdAt: { gte: member.visibleFrom } } : {}),
    },
    include: {
      from: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  await prisma.chatMessage.updateMany({
    where: { chatId, fromId: { not: userId }, read: false },
    data: { read: true },
  });

  res.json(messages);
});

// POST /chats/:chatId/messages — send message to a known chat
router.post('/chats/:chatId/messages', requireAuth, async (req, res) => {
  const chatId = req.params.chatId as string;
  const userId = req.user!.userId;
  const { text } = req.body;

  const member = await prisma.chatUser.findUnique({
    where: { chatId_userId: { chatId, userId: userId } },
  });

  if (!member) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const newVisibleDate = new Date();

  // sender themselves deleted the chat — restore their view with visibleFrom cutoff
  if (member.deletedAt) {
    await prisma.chatUser.update({
      where: { chatId_userId: { chatId, userId } },
      data: { deletedAt: null, visibleFrom: newVisibleDate },
    });
  }

  // restore the recipient's view too if they had deleted it, keep their visibleFrom
  await prisma.chatUser.updateMany({
    where: { chatId, userId: { not: userId }, deletedAt: { not: null } },
    data: { deletedAt: null, visibleFrom: newVisibleDate },
  });

  const message = await prisma.chatMessage.create({
    data: { chatId, fromId: userId, text },
    include: {
      from: { select: { id: true, firstName: true, lastName: true } },
    },
  });

  res.status(201).json(message);
});

// DELETE /chats/:chatId — soft delete, hard delete if both users deleted
router.delete('/chats/:chatId', requireAuth, async (req, res) => {
  const chatId = req.params.chatId as string;
  const userId = req.user!.userId;
  const now = new Date();

  await prisma.chatUser.update({
    where: { chatId_userId: { chatId, userId: userId } },
    data: { deletedAt: now, visibleFrom: now },
  });

  const allMembers = await prisma.chatUser.findMany({ where: { chatId } });
  const everyoneDeleted = allMembers.every((cu) => cu.deletedAt !== null);

  if (everyoneDeleted) {
    await prisma.chat.delete({ where: { id: chatId } });
  }

  res.sendStatus(204);
});

export default router;
