import React from "react";
import { formatDateLabel } from "../../utils/datetime";

interface Props {
  date: Date;
}

const ChatDateSeparator = ({ date }: Props) => {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-[var(--text-color-muted)] opacity-20" />
      <span className="text-xs text-[var(--text-color-muted)] whitespace-nowrap">
        {formatDateLabel(date)}
      </span>
      <div className="flex-1 h-px bg-[var(--text-color-muted)] opacity-20" />
    </div>
  );
};

export default ChatDateSeparator;
