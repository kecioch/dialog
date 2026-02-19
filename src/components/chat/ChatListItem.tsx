import React from "react";
import Avatar from "./Avatar";
import { ChatData } from "../../pages/Home";

interface Props {
  data: ChatData;
  selected?: boolean;
  onClick: () => void;
}

const ChatListItem = ({ data, selected = false, onClick }: Props) => {
  const lastMessage = data.messages[data.messages.length - 1];
  const unreadMessages = data.messages.reduce(
    (acc, curr) => acc + (curr.read ? 0 : 1),
    0,
  );

  return (
    <li className="flex">
      <button
        className={`min-w-0 flex-1 h-16 flex justify-start items-start gap-2 p-2 rounded-lg
            transition-all duration-200
            active:bg-[var(--neutral-200)]
            ${selected && "bg-[var(--neutral-150)]"}`}
        onClick={onClick}
      >
        <Avatar className="h-full" />
        <div className="flex-1 h-full flex flex-col justify-start item-start text-start min-w-0">
          <p className="font-normal truncate">{data.name}</p>
          <p className="font-light text-sm text-[var(--neutral-300)] truncate">
            {lastMessage?.text}
          </p>
        </div>
        <div className="h-full text-sm text-right pr-1 flex flex-col justify-start items-end gap-1">
          <p className="text-sm">{lastMessage?.date.toLocaleDateString()}</p>
          {unreadMessages > 0 && (
            <span className="bg-[var(--accent-500)] text-[var(--neutral-100)] py-[2px] px-[8px] rounded-md font-semibold">
              {unreadMessages}
            </span>
          )}
        </div>
      </button>
    </li>
  );
};

export default ChatListItem;
