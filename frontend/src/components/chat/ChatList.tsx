import React from "react";
import ChatListItem from "./ChatListItem";
import { ChatData } from "../../pages/Home";
import Searchbar from "./Searchbar";
import { useAuth } from "../../hooks/useAuth";
import MutedTextHeading from "../ui/MutedTextHeading";

interface Props {
  chats: ChatData[];
  className?: string;
  selectedChatIndex?: number;
  onSelect: (index: number) => void;
  onSearch: (text: string) => void;
}

const ChatList = ({
  chats,
  className,
  selectedChatIndex,
  onSelect,
  onSearch,
}: Props) => {
  const { user } = useAuth();
  return (
    <section className={`py-3 pb-0 flex flex-col ${className}`}>
      <div className="px-3">
        <h1 className="text-4xl uppercase text-center mb-7">Chats</h1>
        <Searchbar onSearch={onSearch} />
        <p className="text-center mb-8">Hello, {user?.firstName} !</p>
      </div>
      {chats.length > 0 ? (
        <ul className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col gap-2 px-3">
          {chats.map((el, i) => (
            <ChatListItem
              key={i}
              data={el}
              selected={i === selectedChatIndex}
              onClick={() => onSelect(i)}
            />
          ))}
        </ul>
      ) : (
        <MutedTextHeading>Looks empty here!</MutedTextHeading>
      )}
    </section>
  );
};

export default ChatList;
