import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { cn } from "../../lib/helper";

interface Props {
  icon: IconProp;
  className?: string;
  title?: string;
  fill?: boolean;
  onClick?: () => void;
}

const IconButton = ({
  icon,
  title,
  className,
  fill = false,
  onClick,
}: Props) => {
  return (
    <button
      title={title}
      className={cn(
        `py-1 px-1.5 rounded-md
        transition-all duration-200
        ${fill ? "bg-[var(--secondary-700)] active:bg-[var(--secondary-500)] text-[var(--neutral-100)]" : "text-[var(--text-color-main)] active:text-[var(--neutral-300)]"}`,
        className,
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
