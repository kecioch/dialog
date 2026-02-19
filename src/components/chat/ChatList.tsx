import React from "react";
import ChatListItem from "./ChatListItem";
import { ChatData } from "../../pages/Home";

interface Props {
  chats: ChatData[];
  className?: string;
  selectedChatIndex?: number;
  onSelect: (index: number) => void;
}

const ChatList = ({ chats, className, selectedChatIndex, onSelect }: Props) => {
  return (
    <section className={`p-3 pb-0 flex flex-col ${className}`}>
      <h1 className="text-4xl uppercase text-center mb-10">Chats</h1>
      <ul className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col gap-3">
        {chats.map((el, i) => (
          <ChatListItem
            key={i}
            data={el}
            selected={i === selectedChatIndex}
            onClick={() => onSelect(i)}
          />
        ))}
      </ul>
    </section>
  );
};

export default ChatList;
