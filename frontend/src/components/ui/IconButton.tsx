import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { cn } from "../../utils/helper";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Props {
  icon: IconProp;
  className?: string;
  title?: string;
  fill?: boolean;
  activeScale?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const IconButton = ({
  icon,
  title,
  className,
  fill = false,
  activeScale = true,
  disabled = false,
  isLoading = false,
  onClick,
}: Props) => {
  return (
    <button
      title={title}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={cn(
        `py-1 px-1.5 rounded-md
        transition-all duration-200
        ${activeScale && !isLoading && !disabled && "active:scale-[102%]"}
        ${
          fill
            ? `bg-[var(--secondary-700)] text-[var(--neutral-100)] ${!isLoading && !disabled && "active:bg-[var(--secondary-500)]"}`
            : `text-[var(--text-color-main)] ${!isLoading && !disabled && "active:text-[var(--neutral-300)]"}`
        }`,
        className,
      )}
    >
      <FontAwesomeIcon icon={isLoading ? faSpinner : icon} spin={isLoading} />
    </button>
  );
};

export default IconButton;
