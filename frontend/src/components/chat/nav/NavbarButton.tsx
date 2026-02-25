import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  icon: IconProp;
  title?: string;
  active?: boolean;
  onClick?: () => void;
}

const NavbarButton = ({ icon, title, active = false, onClick }: Props) => {
  return (
    <div className="relative flex items-center">
      <button
        onClick={onClick}
        title={title}
        className={`p-1.5 rounded-lg text-[var(--neutral-100)]
        transition-all duration-200
        active:text-[var(--accent-500)] active:scale-105
        ${active && "bg-[var(--primary-700)]"}`}
      >
        <FontAwesomeIcon icon={icon} className="drop-shadow-lg" />
      </button>

      {active && (
        <motion.div
          layoutId="navbar-active-indicator"
          className="absolute -right-[11px] top-0 w-[3px] h-full bg-[var(--accent-500)] rounded-l-full"
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

export default NavbarButton;
