import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ErrorText = ({ children, className }: Props) => {
  return <p className={`text-red-700 ${className}`}>{children}</p>;
};

export default ErrorText;
