import React, { useState } from "react";
import Navbar from "../components/chat/nav/Navbar";
import ChatList from "../components/chat/ChatList";
import Chat from "../components/chat/Chat";

export const USER_ID = "007";

export interface ChatMessageData {
  from: string;
  date: Date;
  text: string;
  read: boolean;
}

export interface ChatData {
  //   id: string;
  name: string;
  messages: ChatMessageData[];
}

const CHAT_DATA: ChatData[] = [
  {
    name: "Albert Flores",
    messages: [
      {
        from: "001",
        date: new Date("01-01-2026"),
        text: "Hello! 👍",
        read: true,
      },
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
        text: "You want going to Mordor? I need a Partner. You want going to Mordor? I need a Partner. You want going to Mordor? I need a Partner",
        read: true,
      },
      {
        from: USER_ID,
        date: new Date("01-01-2026"),
        text: "I dont know.",
        read: true,
      },
      {
        from: USER_ID,
        date: new Date("01-01-2026"),
        text: "Isnt it dangerous? I think its too dangerous.",
        read: true,
      },
      {
        from: "004",
        date: new Date("01-01-2026"),
        text: "Noooooo, trust me. You can trust me bro. Sauron isnt waiting",
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
  const [chats, setChats] = useState<ChatData[]>(CHAT_DATA);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number>();

  const handleSelectChat = (index: number) => setSelectedChatIndex(index);

  const handleSearchChat = (text: string) => {
    setChats(
      CHAT_DATA.filter((el) =>
        el.name.toLowerCase().includes(text.toLocaleLowerCase()),
      ),
    );
  };

  return (
    <div className="w-full h-screen flex from-[var(--bg-gradient-from)] to-[var(--bg-gradient-to)] bg-gradient-to-br theme-transition">
      <Navbar className="min-w-[4em]" />
      <main className="flex-1 bg-[var(--bg-chatlist)] rounded-l-3xl flex py-10 pr-8 min-w-0 theme-transition">
        <ChatList
          className="min-w-[20em] w-[20%] text-[var(--text-color-chatlist)]"
          chats={chats}
          selectedChatIndex={selectedChatIndex}
          onSelect={handleSelectChat}
          onSearch={handleSearchChat}
        />
        <Chat
          className="flex-1 min-w-0"
          data={
            selectedChatIndex !== undefined
              ? CHAT_DATA[selectedChatIndex]
              : undefined
          }
        />
      </main>
    </div>
  );
};

export default Home;
