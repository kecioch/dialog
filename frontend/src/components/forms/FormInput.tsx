import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={resolvedType}
        value={value}
        className={`peer w-full bg-transparent border-b-[0.1em] p-2 pb-1 pt-5 text-[var(--neutral-500)] focus:border-[var(--primary-300)] focus:outline-none placeholder-transparent 
          isPassword ? "pr-10" : ""
          ${error ? "border-red-700 text-red-700" : "border-[var(--primary-700)]"}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`absolute pointer-events-none left-2 top-4 transition-all duration-200 uppercase
          peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--primary-300)]
          peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs
          ${error ? "text-red-700" : "text-[var(--primary-700)]"}
        `}
      >
        {children}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-4 text-[var(--neutral-300)] active:text-[var(--primary-500)] transition-colors"
          tabIndex={-1}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      )}
    </div>
  );
};

export default FormInput;
