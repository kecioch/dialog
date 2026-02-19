import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
  primaryColor?: boolean;
  fill?: boolean;
  className?: string;
}

const ButtonNavLink = ({
  to,
  children,
  primaryColor = false,
  fill = true,
  className,
}: Props) => {
  return (
    <NavLink
      to={to}
      draggable={false}
      className={`uppercase p-2 px-9 rounded-3xl 
        ${fill ? 
            primaryColor ?
            "bg-[var(--primary-500)] text-[var(--neutral-100)]" : "bg-[var(--neutral-100)] text-[var(--primary-500)]"
          : "text-[var(--neutral-100)] border-[1.5px] border-[var(--neutral-100)]"} 
        transition-all duration-200
        hover:bg-[var(--accent-500)] hover:text-[var(--neutral-100)]
        active:bg-[var(--accent-500)] active:text-[var(--neutral-100)] active:scale-[102%]
        ${className}`}
    >
      {children}
    </NavLink>
  );
};

export default ButtonNavLink;
