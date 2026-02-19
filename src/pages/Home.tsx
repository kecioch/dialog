import React, { useState } from "react";
import Navbar from "../components/chat/nav/Navbar";
import ChatList from "../components/chat/ChatList";
import Chat from "../components/chat/Chat";

const USER_ID = "007";

export interface ChatMessage {
  from: string;
  date: Date;
  text: string;
  read: boolean;
}

export interface ChatData {
  //   id: string;
  name: string;
  messages: ChatMessage[];
}

const CHAT_DATA: ChatData[] = [
  {
    name: "Albert Flores",
    messages: [
      { from: "001", date: new Date("01-01-2026"), text: "Hello!", read: true },
    ],
  },
  {
    name: "Ronald Richards",
    messages: [
      { from: "002", date: new Date(), text: "This is cool!", read: true },
      { from: USER_ID, date: new Date(), text: "Yes it is!", read: true },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
      { from: "002", date: new Date(), text: "Whats Jim doing?", read: false },
    ],
  },
  {
    name: "Joachim Stein",
    messages: [
      {
        from: "003",
        date: new Date("01-01-2026"),
        text: "Whats Up!",
        read: true,
      },
    ],
  },
  {
    name: "Bilbo Beutlin",
    messages: [
      {
        from: "004",
        date: new Date("01-01-2026"),
        text: "You want going to Mordor? I need a Partner",
        read: false,
      },
    ],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
  {
    name: "Heinrich Jim",
    messages: [],
  },
];

const Home = () => {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number>();

  const handleSelectChat = (index: number) => setSelectedChatIndex(index);

  return (
    <div className="w-full h-screen flex from-[var(--primary-500)] to-[var(--primary-300)] bg-gradient-to-br">
      <Navbar className="min-w-[4em]" />
      <main className="flex-1 bg-[var(--neutral-100)] rounded-l-3xl flex py-10 pr-8">
        <ChatList
          className="min-w-[25em] w-[20%] text-[var(--neutral-400)]"
          chats={CHAT_DATA}
          selectedChatIndex={selectedChatIndex}
          onSelect={handleSelectChat}
        />
        <Chat
          className="flex-1"
          data={selectedChatIndex !== undefined ? CHAT_DATA[selectedChatIndex] : undefined}
        />
      </main>
    </div>
  );
};

export default Home;
