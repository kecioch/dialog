import { ChatData } from "../types/chat";

export function getChatName(chat: ChatData, currentUserId: string): string {
  const other = chat.users.find((u) => u.user.id !== currentUserId);
  if (!other) return "Unknown";
  return `${other.user.firstName} ${other.user.lastName}`;
}
