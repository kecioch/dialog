import { useEffect, useState } from "react";
import api from "../lib/api";
import { ChatData, ChatMessageData } from "../types/chat";

type loadingState = null | "loadingChats" | "openingChat" | "deletingChat";

export function useChatList() {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState<loadingState>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("loadingChats");
    setError(null);
    api
      .get<ChatData[]>("/chats")
      .then((data) =>
        setChats(
          data.map((chat) => ({
            ...chat,
            lastMessage: chat.lastMessage
              ? {
                  ...chat.lastMessage,
                  createdAt: new Date(chat.lastMessage.createdAt),
                }
              : null,
          })),
        ),
      )
      .catch((err) => {
        console.error(err);
        setError("Failed to load chatlist");
      })
      .finally(() => setLoading(null));
  }, []);

  const deleteChat = (chatId: string) => {
    setLoading("deletingChat");
    setError(null);
    api
      .delete(`/chats/${chatId}`)
      .then(() => setChats((prev) => prev.filter((c) => c.id !== chatId)))
      .catch(() => setError("Failed to delete chat"))
      .finally(() => setLoading(null));
  };

  const addNewChat = (chat: ChatData) => {
    setChats((prev) =>
      prev.some((c) => c.id === chat.id) ? prev : [chat, ...prev],
    );
  };

  const updateLastMessage = (chatId: string, message: ChatMessageData) => {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, lastMessage: message } : c)),
    );
  };

  const markAsRead = (chatId: string) => {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c)),
    );
  };

  return {
    chats,
    loading,
    error,
    updateLastMessage,
    markAsRead,
    addNewChat,
    deleteChat,
  };
}
