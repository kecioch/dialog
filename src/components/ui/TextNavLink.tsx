import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const TextNavLink = ({ to, children, className }: Props) => {
  return (
    <NavLink
      to={to}
      className={`uppercase transition-all duration-200 hover:text-[var(--accent-500)] ${className}`}
      draggable={false}
    >
      {children}
    </NavLink>
  );
};

export default TextNavLink;
