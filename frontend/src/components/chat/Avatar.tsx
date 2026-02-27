import React from "react";
import { getInitialsFromName } from "../../utils/text";
import { getColorBasedOnText, getContrastTextColor } from "../../utils/colors";
import OnlineDot from "./OnlineDot";

interface Props {
  name?: string;
  rounded?: boolean;
  className?: string;
  isOnline?: boolean;
  showOnlineIndicator?: boolean;
}

const Avatar = ({
  name = "",
  rounded = false,
  className,
  isOnline,
  showOnlineIndicator = false,
}: Props) => {
  const initials = getInitialsFromName(name);
  const bgColor = getColorBasedOnText(initials);
  const textColor = getContrastTextColor(bgColor);

  return (
    <div
      className={`h-10 aspect-square drop-shadow-l flex justify-center items-center select-none relative
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

      {showOnlineIndicator && <OnlineDot online={!!isOnline} className="absolute bottom-0 right-0" />}
    </div>
  );
};

export default Avatar;
