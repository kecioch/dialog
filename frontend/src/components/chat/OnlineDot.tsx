import React from "react";

interface Props {
  online: boolean;
  className?: string;
}

const OnlineDot = ({ online, className }: Props) => (
  <span
    className={`block w-2.5 h-2.5 rounded-full ring-2 ring-[var(--bg-chat-header)]
      transition-colors duration-300
      ${online ? "bg-green-400" : "bg-neutral-500"} ${className}`}
  />
);

export default OnlineDot;
