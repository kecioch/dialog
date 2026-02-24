import React from "react";
import Avatar from "./Avatar";
import IconButton from "../ui/IconButton";
import {
  faEllipsisVertical,
  faPaperclip,
  faPaperPlane,
  faSearch,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { ChatData, USER_ID } from "../../pages/Home";
import ChatMessage from "./ChatMessage";

interface Props {
  data?: ChatData;
  className?: string;
}

const Chat = ({ data, className }: Props) => {
  return (
    <section
      className={`bg-[var(--bg-chat)] theme-transition text-[var(--text-color-main)] rounded-xl p-4 flex flex-col gap-5 ${className}`}
    >
      {data && (
        <>
          <div className="h-16 w-full bg-[var(--bg-chat-header)] rounded-xl drop-shadow-md flex items-center justify-between gap-3 p-2 pr-4 ">
            <Avatar className="h-full" name={data.name} />
            <p className="flex-1 text-lg">{data?.name}</p>
            <IconButton icon={faSearch} className="text-xl" />
            <IconButton icon={faEllipsisVertical} className="text-xl" />
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-7">
            {data?.messages.map((el, i) => (
              <ChatMessage key={i} data={el} isOwn={el.from === USER_ID} />
            ))}
          </div>
          <div className="min-h-14 w-full bg-[var(--bg-chat-input)] rounded-xl drop-shadow-md flex items-center gap-4 px-4 py-2">
            <textarea className="bg-transparent flex-1 h-full outline-none resize-none placeholder-[var(--text-color-muted)]"
            rows={1}
            placeholder="Write your message..." />
            <div className="flex gap-1">
                <IconButton icon={faSmile} title="Emoji" className="text-[var(--text-color-muted)] active:text-[var(--text-color-muted-active)]" />
                <IconButton icon={faPaperclip} title="Attach file" className="text-[var(--text-color-muted)] active:text-[var(--text-color-muted-active)]" />
                <IconButton icon={faPaperPlane} title="Send" className="ml-2" fill />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Chat;
