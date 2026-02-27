import { useEffect } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../lib/socket';
import { ChatData, ChatMessageData } from '../types/chat';
import { useAuth } from './useAuth';

interface SocketHandlers {
  onNewMessage: (chatId: string, message: ChatMessageData) => void;
  onNewChat: (chat: ChatData) => void;
}

export function useSocket({ onNewMessage, onNewChat }: SocketHandlers) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    connectSocket();

    function handleNewMessage(payload: {
      chatId: string;
      message: ChatMessageData;
    }) {
      onNewMessage(payload.chatId, {
        ...payload.message,
        createdAt: new Date(payload.message.createdAt),
      });
    }

    function handleNewChat(chat: ChatData) {
      onNewChat({
        ...chat,
        lastMessage: chat.lastMessage
          ? {
              ...chat.lastMessage,
              createdAt: new Date(chat.lastMessage.createdAt),
            }
          : null,
      });
    }

    socket.on('new_message', handleNewMessage);
    socket.on('new_chat', handleNewChat);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('new_chat', handleNewChat);
      disconnectSocket();
    };
  }, [user]);
}