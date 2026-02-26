export interface ChatMessageData {
  id: string;
  from: { id: string; firstName: string; lastName: string };
  createdAt: Date;
  text: string;
  read: boolean;
}

export interface ChatUserData {
  user: { id: string; firstName: string; lastName: string };
}

export interface ChatData {
  id: string;
  users: ChatUserData[];
  lastMessage: ChatMessageData | null;
  unreadCount: number;
}

export interface Contact {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
}