import React from "react";
import { ChatMessageData } from "../../types/chat";

interface Props {
  data: ChatMessageData;
  isOwn: boolean;
}

const ChatMessage = ({ data, isOwn }: Props) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div>
        <div
          className={`px-4 py-2 rounded-xl max-w-[40em]
            ${isOwn ? "bg-[var(--bg-chat-message-own)]" : "bg-[var(--bg-chat-message)]"}`}
        >
          <p>{data.text}</p>
        </div>
        <p className="text-xs px-2 pt-1">{data.createdAt.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
