import React from "react";
import { getInitialsFromName } from "../../utils/text";
import { getColorBasedOnText, getContrastTextColor } from "../../utils/colors";

interface Props {
  name?: string;
  rounded?: boolean;
  className?: string;
}

const Avatar = ({ name = "", rounded = false, className }: Props) => {
  const initials = getInitialsFromName(name);
  const bgColor = getColorBasedOnText(initials);
  const textColor = getContrastTextColor(bgColor);

  return (
    <div
      className={`h-10 aspect-square drop-shadow-l flex justify-center items-center select-none
        ${rounded ? "rounded-full" : "rounded-lg"}
        ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <span className="[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] text-base">
        {initials}
      </span>
    </div>
  );
};

export default Avatar;
