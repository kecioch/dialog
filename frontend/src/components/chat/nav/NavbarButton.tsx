import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  icon: IconProp;
  title?: string;
  active?: boolean;
  onClick?: () => void;
}

const NavbarButton = ({ icon, title, active = false, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg text-
        transition-all duration-200
        active:text-[var(--accent-500)] active:scale-105
        ${active && "bg-[var(--primary-700)]"}`}
    >
      <FontAwesomeIcon icon={icon} className="drop-shadow-lg"/>
    </button>
  );
};

export default NavbarButton;
