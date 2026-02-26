import React, { useRef, useState } from "react";
import IconButton from "./IconButton";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MenuItem {
  label: string;
  icon: IconProp;
  danger?: boolean;
  onClick: () => void;
}

interface Props {
  items: MenuItem[];
  className?: string;
}

const ButtonDropdownMenu = ({ items, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <div ref={buttonRef}>
      <IconButton
        icon={faEllipsisVertical}
        className={`text-xl ${className}`}
        activeScale={false}
        onClick={handleOpen}
      />
      {open &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed z-50 min-w-[10rem] rounded-xl drop-shadow-xl overflow-hidden flex flex-col"
              style={{ top: pos.top, right: pos.right }}
            >
              {items.map((item, i) => (
                <button
                  key={i}
                  className={`text-left px-4 py-3 transition-colors duration-150
                    ${
                      item.danger
                        ? "bg-red-700 text-[var(--neutral-500)] font-normal hover:bg-red-600 "
                        : "bg-[var(--bg-dropdown)] text-[var(--text-color-main)]  hover:bg-[var(--bg-dropdown-hover)]"
                    }`}
                  onClick={() => {
                    setOpen(false);
                    item.onClick();
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} /><span className="ml-2">{item.label}</span>
                </button>
              ))}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
};

export default ButtonDropdownMenu;
