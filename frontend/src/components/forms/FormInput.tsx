import React from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  value?: string;
  placeholder?: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const FormInput = ({
  id,
  children,
  placeholder,
  type = "text",
  className,
  value,
  required = false,
  error = false,
  disabled = false,
  onChange,
}: Props) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className={error ? "text-red-700" : "text-[var(--neutral-500)]"}
      >
        {children}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        disabled={disabled}
        className={`border-[1.5px] rounded-lg p-3 text-[var(--neutral-500)]
              ${
                error
                  ? "bg-red-300 border-red-700"
                  : "bg-[var(--neutral-150)] border-[var(--primary-500)]"
              }
              focus:border-[var(--secondary-300)]
              outline-none placeholder-[var(--neutral-300)]
              `}
      />
    </div>
  );
};

export default FormInput;
