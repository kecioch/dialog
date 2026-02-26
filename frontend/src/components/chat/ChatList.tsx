import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import Searchbar from "./Searchbar";
import MutedTextHeading from "../ui/MutedTextHeading";
import { ChatData } from "../../types/chat";
import { useAuth } from "../../hooks/useAuth";
import { getChatName } from "../../utils/chat";
import Spinner from "../ui/Spinner";
import ErrorText from "../ui/ErrorText";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  data: ChatData[];
  loading?: boolean;
  error?: string | null;
  className?: string;
  selectedChat?: ChatData;
  onSelect: (chat: ChatData) => void;
}

const ChatList = ({
  data,
  loading = false,
  error,
  className,
  selectedChat,
  onSelect,
}: Props) => {
  const { user } = useAuth();
  const [chatList, setChatList] = useState<ChatData[]>([]);

  useEffect(() => setChatList([...data]), [data]);

  const handleSearchChat = (text: string) => {
    setChatList(
      data.filter((el) => {
        const chatName = user ? getChatName(el, user?.id) : "";
        return chatName.toLowerCase().includes(text.toLocaleLowerCase());
      }),
    );
  };

  return (
    <section className={`py-3 min-w-0 pb-0 flex flex-col ${className}`}>
      <div className="px-3">
        <h1 className="text-4xl uppercase text-center mb-7">Chats</h1>
        <Searchbar onSearch={handleSearchChat} />
      </div>
      {error && <ErrorText className="px-3 mb-3">{error}</ErrorText>}
      {loading ? (
        <Spinner />
      ) : (
        <motion.ul
          layout
          className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2 px-3"
        >
          <AnimatePresence>
            {chatList.map((el, i) => (
              <ChatListItem
                key={i}
                data={el}
                selected={el.id === selectedChat?.id}
                onClick={() => onSelect(el)}
              />
            ))}

            {chatList.length <= 0 && (
              <MutedTextHeading>Looks empty here!</MutedTextHeading>
            )}
          </AnimatePresence>
        </motion.ul>
      )}
    </section>
  );
};

export default ChatList;
