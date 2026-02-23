import React from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}

const FormInput = ({ id, children, placeholder, type = "text", className }: Props) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-[var(--neutral-500)]">
        {children}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        className="bg-[var(--neutral-150)] border-[1.5px] border-[var(--primary-500)] 
              text-[var(--neutral-500)] rounded-lg p-3
              focus:border-[var(--secondary-300)]
              outline-none placeholder-[var(--neutral-300)]
              "
      />
    </div>
  );
};

export default FormInput;
