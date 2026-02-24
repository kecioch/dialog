import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  children: React.ReactNode;
  fill?: boolean;
  flex?: boolean;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  fill = false,
  flex = false,
  isLoading = false,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`rounded-lg p-3 uppercase disabled:opacity-60
        transition-all duration-200
        ${
          fill
            ? `bg-[var(--primary-500)] text-[var(--neutral-100)] ${!isLoading && !disabled && "hover:bg-[var(--primary-300)] active:bg-[var(--primary-700)]"}`
            : `border-[1.5px] border-[var(--primary-700)] text-[var(--primary-700)] ${!isLoading && !disabled && "hover:text-[var(--primary-300)] hover:border-[var(--primary-300)] active:text-[var(--primary-300)] active:border-[var(--primary-300)]"}`
        }
        ${flex && "flex justify-center items-center gap-2"}
        ${!isLoading && !disabled && "active:scale-[102%]"}
        ${className}`}
    >
      {children}
      {isLoading && (
        <FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4 ml-3" />
      )}
    </button>
  );
};

export default Button;
