import React, { useCallback, useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const EMOJIS = [
  "😀",
  "😂",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "😅",
  "😭",
  "😤",
  "🥳",
  "😇",
  "🤩",
  "😏",
  "😒",
  "🙄",
  "😴",
  "🤯",
  "😱",
  "🤗",
  "😬",
  "👍",
  "👎",
  "❤️",
  "🔥",
  "✨",
  "🎉",
  "👏",
  "🙏",
  "💯",
  "😊",
  "😢",
  "😡",
  "🤣",
  "😌",
  "🫡",
  "💀",
  "🫶",
  "👀",
  "💪",
  "🎶",
];

interface Props {
  onSelect: (emoji: string) => void;
  className?: string;
}

const EmojiPickerButton = ({ onSelect, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ bottom: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Update pos function to recalculate the position of picker window
  const updatePos = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left,
      });
    }
  }, []);

  // Continuously sync position
  useEffect(() => {
    if (!open) return;

    const loop = () => {
      updatePos();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, updatePos]);

  const handleOpen = () => {
    updatePos();
    setOpen((prev) => !prev);
  };

  return (
    <div ref={buttonRef}>
      <IconButton
        icon={faSmile}
        title="Emoji"
        className={`text-[var(--text-color-muted)] active:text-[var(--text-color-muted-active)] ${className}`}
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
              className="fixed z-50 rounded-xl drop-shadow-xl overflow-hidden p-2"
              style={{
                bottom: pos.bottom,
                left: pos.left - 200,
                background: "var(--bg-dropdown)",
                width: "250px",
              }}
            >
              <div className="grid grid-cols-8 gap-0.5">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    className="text-xl p-1 font-serif rounded-lg hover:bg-[var(--bg-dropdown-hover)] transition-colors duration-100 leading-none
                      aspect-square flex items-center justify-center"
                    onClick={() => {
                      onSelect(emoji);
                      setOpen(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
};

export default EmojiPickerButton;
