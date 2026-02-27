import { useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../lib/socket";
import { ChatData, ChatMessageData } from "../types/chat";
import { useAuth } from "./useAuth";
import { useNotificationSound } from "./useNotificationSound";

interface SocketHandlers {
  onNewMessage: (chatId: string, message: ChatMessageData) => void;
  onNewChat: (chat: ChatData) => void;
  onUserStatus: (
    userId: string,
    online: boolean,
    lastSeen: string | null,
  ) => void;
}

export function useSocket({
  onNewMessage,
  onNewChat,
  onUserStatus,
}: SocketHandlers) {
  const { user } = useAuth();
  const { playSound } = useNotificationSound();

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    connectSocket();

    function handleNewMessage(payload: {
      chatId: string;
      message: ChatMessageData;
    }) {
      playSound("newMessage");
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

    function handleUserStatus(payload: {
      userId: string;
      online: boolean;
      lastSeen: string | null;
    }) {
      onUserStatus(payload.userId, payload.online, payload.lastSeen);
    }

    socket.on("new_message", handleNewMessage);
    socket.on("new_chat", handleNewChat);
    socket.on("user_status", handleUserStatus);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("new_chat", handleNewChat);
      socket.off("user_status", handleUserStatus);
      disconnectSocket();
    };
  }, [user]);
}
