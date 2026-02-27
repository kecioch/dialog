import React, { useRef, useState } from "react";
import IconButton from "./IconButton";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AnimatePresence, motion } from "framer-motion";

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
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />
              <motion.div
                className="fixed z-50 min-w-[10rem] rounded-xl drop-shadow-xl overflow-hidden flex flex-col"
                style={{ top: pos.top, right: pos.right }}
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {items.map((item, i) => (
                  <button
                    key={i}
                    className={`text-left px-4 py-3 transition-colors duration-150
                    ${
                      item.danger
                        ? "bg-red-700 text-[var(--neutral-500)] font-normal hover:bg-red-600 hover:text-[var(--neutral-100)] "
                        : "bg-[var(--bg-dropdown)] text-[var(--text-color-main)]  hover:bg-[var(--bg-dropdown-hover)]"
                    }`}
                    onClick={() => {
                      setOpen(false);
                      item.onClick();
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span className="ml-2">{item.label}</span>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default ButtonDropdownMenu;
