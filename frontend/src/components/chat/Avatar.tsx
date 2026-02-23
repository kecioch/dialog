import React from "react";

interface Props {
  rounded?: boolean;
  className?: string;
}

const Avatar = ({ rounded = false, className }: Props) => {
  return (
    <div
      className={`h-10 aspect-square bg-[var(--accent-300)] drop-shadow-l
        ${rounded ? "rounded-full" : "rounded-lg"}
        ${className}`}
    />
  );
};

export default Avatar;
