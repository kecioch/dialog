import React from "react";
import Avatar from "./Avatar";
import { ChatData } from "../../types/chat";
import { useAuth } from "../../hooks/useAuth";
import { getChatName } from "../../utils/chat";
import { motion } from "framer-motion";
import { formatLastMessageDate } from "../../utils/datetime";

interface Props {
  data: ChatData;
  selected?: boolean;
  onClick: () => void;
}

const ChatListItem = ({ data, selected = false, onClick }: Props) => {
  const { user } = useAuth();

  const chatName = user ? getChatName(data, user?.id) : "";
  const lastMessageDateString = data.lastMessage
    ? formatLastMessageDate(data.lastMessage.createdAt)
    : "";

  return (
    <motion.li
      className="flex"
      layout
      exit={{
        opacity: 0,
        x: 20,
        height: 0,
        marginBottom: 0,
        padding: 0,
        overflow: "hidden",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <button
        className={`min-w-0 flex-1 h-16 flex justify-start items-start gap-2 p-2 rounded-lg
            transition-all duration-200
            active:bg-[var(--bg-chatlist-selected-active)]
            ${selected && "bg-[var(--bg-chatlist-selected)]"}`}
        onClick={onClick}
      >
        <Avatar className="h-full" name={chatName} />
        <div className="flex-1 h-full flex flex-col justify-start item-start text-start min-w-0">
          <p className="font-normal truncate">{chatName}</p>
          <p className="font-light text-sm text-[var(--text-color-chatlist-muted)] truncate">
            {data.lastMessage?.text}
          </p>
        </div>
        <div className="h-full text-sm text-right pr-1 flex flex-col justify-start items-end gap-1">
          <p className="text-sm text-[var(--text-color-chatlist-time)]">
            {lastMessageDateString}
          </p>
          {data.unreadCount > 0 && (
            <span className="bg-[var(--accent-500)] text-[var(--neutral-100)] py-[2px] px-[8px] rounded-md font-semibold">
              {data.unreadCount}
            </span>
          )}
        </div>
      </button>
    </motion.li>
  );
};

export default ChatListItem;
