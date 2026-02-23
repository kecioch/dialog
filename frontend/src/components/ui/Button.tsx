import React from "react";

interface Props {
  children: React.ReactNode;
  fill?: boolean;
  flex?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  fill = false,
  flex = false,
  className,
  onClick,
}: Props) => {
  return (
    <button
        onClick={onClick}
      className={`rounded-lg p-3 uppercase
        ${
          fill
            ? "bg-[var(--primary-500)] text-[var(--neutral-100)] hover:bg-[var(--primary-300)] active:bg-[var(--primary-700)]"
            : "border-[1.5px] border-[var(--primary-700)] text-[var(--primary-700)] hover:text-[var(--primary-300)] hover:border-[var(--primary-300)] active:text-[var(--primary-300)] active:border-[var(--primary-300)]"
        }
        ${flex && "flex justify-center items-center gap-2"}
        transition-all duration-200
         active:scale-[102%]
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
