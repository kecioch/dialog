import React from "react";

const FormDivider = () => {
  return (
    <div className="text-[var(--primary-700)] uppercase flex flex-row justify-center items-center gap-7">
      <div className="bg-[var(--primary-700)] h-[1.5px] w-full" />
      <span>Or</span>
      <div className="bg-[var(--primary-700)] h-[1.5px] w-full" />
    </div>
  );
};

export default FormDivider;
