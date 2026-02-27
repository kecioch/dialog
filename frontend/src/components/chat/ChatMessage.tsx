import React from "react";
import { ChatMessageData } from "../../types/chat";

interface Props {
  data: ChatMessageData;
  isOwn: boolean;
}

const ChatMessage = ({ data, isOwn }: Props) => {
  const timeString = data.createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="max-w-full lg:max-w-[50%] xl:max-w-[60%]">
        <div
          className={`px-4 py-2 rounded-xl
            ${isOwn ? "bg-[var(--bg-chat-message-own)]" : "bg-[var(--bg-chat-message)]"}`}
        >
          <p className="break-words whitespace-pre-wrap">{data.text}</p>
        </div>
        <p className={`text-xs px-2 pt-1 ${isOwn ? "text-end" : "text-start"}`}>
          {timeString}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
