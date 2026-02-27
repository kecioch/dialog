import { useEffect, useState } from "react";
import { ChatData, ChatMessageData } from "../types/chat";
import api from "../lib/api";
import { getSocket } from "../lib/socket";

type loadingState = null | "loadingMessages" | "sendingMessage";

export function useChat(
  chatId: string | undefined,
  onChatCreated: (chat: ChatData) => void,
  onMessageSent: (chatId: string, message: ChatMessageData) => void,
  contactId?: string,
) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [loading, setLoading] = useState<loadingState>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setError(null);
      return;
    }

    setLoading("loadingMessages");
    setMessages([]);
    setError(null);

    api
      .get<ChatMessageData[]>(`/chats/${chatId}/messages`)
      .then((data) =>
        setMessages(
          data.map((m) => ({ ...m, createdAt: new Date(m.createdAt) })),
        ),
      )
      .catch(() => {
        alert("Failed to load messages");
        setError("Failed to load messages");
      })
      .finally(() => setLoading(null));
  }, [chatId]);

  // Listen for incoming messages on the active chat
  useEffect(() => {
    if (!chatId) return;

    const socket = getSocket();

    function handleNewMessage(payload: {
      chatId: string;
      message: ChatMessageData;
    }) {
      if (payload.chatId !== chatId) return;
      setMessages((prev) => [
        ...prev,
        { ...payload.message, createdAt: new Date(payload.message.createdAt) },
      ]);
    }

    socket.on("new_message", handleNewMessage);
    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [chatId]);

  const sendMessage = async (text: string) => {
    setLoading("sendingMessage");
    setError(null);

    try {
      let targetChatId = chatId;

      // Create new chat
      if (!targetChatId) {
        if (!contactId) throw new Error("No chat or contact provided");
        const data = await api.post<ChatData>("/chats/open", {
          targetUserId: contactId,
        });
        const newChat = {
          ...data,
          lastMessage: data.lastMessage
            ? {
                ...data.lastMessage,
                createdAt: new Date(data.lastMessage.createdAt),
              }
            : null,
        };
        targetChatId = newChat.id;
        onChatCreated(newChat);
      }

      // Send message
      const data = await api.post<ChatMessageData>(
        `/chats/${targetChatId}/messages`,
        { text },
      );

      // Update messages in chat and last message in chatlist
      const newMessage = { ...data, createdAt: new Date(data.createdAt) };
      setMessages((prev) => [...prev, newMessage]);
      onMessageSent(targetChatId, newMessage);
    } catch {
      alert("Failed to send message");
      setError("Failed to send message");
    } finally {
      setLoading(null);
    }
  };

  return { messages, loading, error, sendMessage };
}
