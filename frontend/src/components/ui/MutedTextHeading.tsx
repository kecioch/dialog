import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MutedTextHeading = ({ children, className }: Props) => {
  return (
    <p
      className={`text-center font-light text-[var(--text-color-muted)] ${className}`}
    >
      {children}
    </p>
  );
};

export default MutedTextHeading;
