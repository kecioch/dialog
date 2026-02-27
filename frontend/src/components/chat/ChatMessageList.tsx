import React from "react";
import { ChatMessageData } from "../../types/chat";
import ChatMessage from "./ChatMessage";
import ChatDateSeparator from "./ChatDateSeparator";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  data: ChatMessageData[];
}

const ChatMessageList = ({ data }: Props) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-7">
      {data.map((el, i) => {
        const prev = data[i - 1];
        const showDateSeparator =
          el.createdAt.toDateString() !== prev?.createdAt.toDateString();

        return (
          <React.Fragment key={i}>
            {showDateSeparator && <ChatDateSeparator date={el.createdAt} />}
            <ChatMessage data={el} isOwn={el.from.id === user?.id} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
