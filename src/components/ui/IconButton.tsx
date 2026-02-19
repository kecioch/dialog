import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  icon: IconProp;
  className?: string;
  fill?: boolean;
  onClick?: () => void;
}

const IconButton = ({ icon, className, fill = false, onClick }: Props) => {
  return (
    <button
      className={`p-1 rounded-md
        transition-all duration-200
        ${fill ? "bg-[var(--secondary-700)] active:bg-[var(--secondary-500)] text-[var(--neutral-100)]" : "text-[var(--neutral-500)] active:text-[var(--neutral-300)]"}
        ${className}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
