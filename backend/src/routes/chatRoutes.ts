import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import { getIO } from '../socket';

const router = Router();

// GET /contacts - Browse all users except current user
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

// GET /chats - List chats that current user hasnt deleted
router.get(
  '/chats',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;

    // Find chats
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

    // Map/transform and sort
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

        // Then last message date, newest first
        const dateA = a.lastMessage?.createdAt ?? a.createdAt;
        const dateB = b.lastMessage?.createdAt ?? b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });

    res.json(result);
  }),
);

// POST /chats/open - Get or create chat with a user
router.post('/chats/open', requireAuth, async (req, res) => {
  const { targetUserId } = req.body;
  const currentUserId = req.user?.userId;

  // Create include rule
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

  // Find existing chat
  let chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { users: { some: { userId: currentUserId } } },
        { users: { some: { userId: targetUserId } } },
      ],
    },
    include,
  });

  // Create new Chat
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

// GET /chats/:chatId/messages - Fetch messages respecting visibleFrom
router.get('/chats/:chatId/messages', requireAuth, async (req, res) => {
  const chatId = req.params.chatId as string;
  const userId = req.user!.userId;

  const member = await prisma.chatUser.findUnique({
    where: { chatId_userId: { chatId, userId } },
  });

  if (!member || member.deletedAt) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Find messages
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

  // Mark messages as read
  await prisma.chatMessage.updateMany({
    where: { chatId, fromId: { not: userId }, read: false },
    data: { read: true },
  });

  res.json(messages);
});

// POST /chats/:chatId/messages - Send message to a known chat
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

  // Sender deleted the chat -> restore view with visibleFrom
  if (member.deletedAt) {
    await prisma.chatUser.update({
      where: { chatId_userId: { chatId, userId } },
      data: { deletedAt: null, visibleFrom: newVisibleDate },
    });
  }

  // Restore the recipients view
  await prisma.chatUser.updateMany({
    where: { chatId, userId: { not: userId }, deletedAt: { not: null } },
    data: { deletedAt: null, visibleFrom: newVisibleDate },
  });

  // Create actual message
  const message = await prisma.chatMessage.create({
    data: { chatId, fromId: userId, text },
    include: {
      from: { select: { id: true, firstName: true, lastName: true } },
    },
  });

  // Create socket notification before returning created message
  const io = getIO();

  // Find all members of this chat to notify
  const chatMembers = await prisma.chatUser.findMany({
    where: { chatId },
    include: {
      user: { select: { id: true, firstName: true, lastName: true } },
    },
  });

  // Notify all members
  for (const member of chatMembers) {
    if (member.userId === userId) continue; // dont notify sender

    // new_message: recipient already has the chat in the list
    io.to(`user:${member.userId}`).emit('new_message', {
      chatId,
      message,
    });

    // new_chat: lets the recipient add/restore the chat in the list
    // Build chat payload from already fetched data
    io.to(`user:${member.userId}`).emit('new_chat', {
      id: chatId,
      createdAt: message.createdAt,
      users: chatMembers.map((m) => ({ user: m.user })),
      lastMessage: message,
      unreadCount: 1,
    });
  }

  res.status(201).json(message);
});

// PATCH /chats/:chatId/read - Mark all messages in chat as read
router.patch('/chats/:chatId/read', requireAuth, asyncHandler(async (req, res) => {
  const chatId = req.params.chatId as string;
  const userId = req.user!.userId;

  await prisma.chatMessage.updateMany({
    where: { chatId, fromId: { not: userId }, read: false },
    data: { read: true },
  });

  res.sendStatus(204);
}));

// DELETE /chats/:chatId - Soft delete and hard delete if both users deleted
router.delete('/chats/:chatId', requireAuth, async (req, res) => {
  const chatId = req.params.chatId as string;
  const userId = req.user!.userId;
  const now = new Date();

  // Soft delete
  await prisma.chatUser.update({
    where: { chatId_userId: { chatId, userId: userId } },
    data: { deletedAt: now, visibleFrom: now },
  });

  const allMembers = await prisma.chatUser.findMany({ where: { chatId } });
  const everyoneDeleted = allMembers.every((cu) => cu.deletedAt !== null);

  // Hard delete
  if (everyoneDeleted) await prisma.chat.delete({ where: { id: chatId } });

  res.sendStatus(204);
});

export default router;
