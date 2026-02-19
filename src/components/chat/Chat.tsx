import React from "react";
import Avatar from "./Avatar";
import IconButton from "../ui/IconButton";
import {
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { ChatData } from "../../pages/Home";

interface Props {
  data?: ChatData;
  className?: string;
}

const Chat = ({ data, className }: Props) => {
  return (
    <section
      className={`bg-[var(--neutral-200)] text-[var(--neutral-500)] rounded-xl p-4 flex flex-col gap-2 ${className}`}
    >
      {data && (
        <>
          <div className="h-16 w-full bg-[var(--neutral-150)] rounded-xl drop-shadow-md flex items-center justify-between gap-3 p-2 pr-4 ">
            <Avatar className="h-full" />
            <p className="flex-1 text-lg">{data?.name}</p>
            <IconButton icon={faSearch} />
            <IconButton icon={faEllipsisVertical} />
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {data?.messages.map((el, i) => (
              <div>{el.text}</div>
            ))}
          </div>
          <div className="h-14 w-full bg-[var(--neutral-100)] rounded-xl drop-shadow-md"></div>
        </>
      )}
    </section>
  );
};

export default Chat;
