import React from "react";

interface Props {
  children: React.ReactNode;
}

const DrawerSubHeading = ({ children }: Props) => {
  return (
    <div className="mb-3 flex justify-center items-center gap-3">
      <h3 className="uppercase text-lg text-[var(--accent-700)]">{children}</h3>
      <div className="bg-[var(--accent-700)] h-[1.5px] flex-1" />
    </div>
  );
};

export default DrawerSubHeading;
