import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";
import IconButton from "../ui/IconButton";
import {
  faPaperclip,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  ChatData,
  ChatMessageData,
  ChatUserData,
  Contact,
} from "../../types/chat";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { getChatName } from "../../utils/chat";
import Spinner from "../ui/Spinner";
import ButtonDropdownMenu from "../ui/ButtonDropDownMenu";
import { useNotificationSound } from "../../hooks/useNotificationSound";
import EmojiPickerButton from "../ui/EmojiPicker";
import ChatMessageList from "./ChatMessageList";
import ErrorText from "../ui/ErrorText";
import { formatLastSeen } from "../../utils/datetime";

interface Props {
  chatData: ChatData | undefined;
  contactData: Contact | undefined;
  className?: string;
  otherUser?: ChatUserData;
  onChatCreated: (newChatData: ChatData) => void;
  onMessageSent: (chatId: string, message: ChatMessageData) => void;
  onDeleteChat: (chatId: string) => void;
}

const Chat = ({
  chatData,
  contactData,
  className,
  otherUser,
  onChatCreated,
  onMessageSent,
  onDeleteChat,
}: Props) => {
  const { user } = useAuth();
  const { playSound } = useNotificationSound();
  const { messages, loading, error, sendMessage } = useChat(
    chatData?.id,
    onChatCreated,
    onMessageSent,
    contactData?.id,
  );
  const [messageText, setMessageText] = useState<string>();

  const chatName = contactData
    ? `${contactData.firstName} ${contactData.lastName}`
    : chatData && user
      ? getChatName(chatData, user.id)
      : "";

  const handleSendMessage = () => {
    if (!messageText) return;
    playSound("sent");
    sendMessage(messageText);
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageText((prev) => (prev ?? "") + emoji);
  };

  const chatBoxRefScrollCallback = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    },
    [messages],
  );

  const isOnline = otherUser?.online ?? false;
  const lastSeen = otherUser?.lastSeen ?? null;

  return (
    <section
      className={`bg-[var(--bg-chat)] theme-transition text-[var(--text-color-main)] rounded-xl p-4 pr-0 flex flex-col gap-5 ${className}`}
    >
      {(chatData || contactData) && (
        <>
          <div className="pr-4">
            <div className="h-16 w-full bg-[var(--bg-chat-header)] rounded-xl drop-shadow-md flex items-center justify-between gap-3 p-2 pr-4 ">
              <Avatar className="h-full" name={chatName} />
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-lg leading-tight">{chatName}</p>
                <p
                  className={`text-xs leading-tight transition-colors duration-300
                             ${isOnline ? "text-green-400" : "text-[var(--text-color-muted)]"}`}
                >
                  {isOnline ? "Online" : formatLastSeen(lastSeen)}
                </p>
              </div>
              <ButtonDropdownMenu
                items={[
                  {
                    label: "Delete Chat",
                    icon: faTrash,
                    danger: true,
                    onClick: () => chatData && onDeleteChat?.(chatData.id),
                  },
                ]}
              />
            </div>
            {error && (
              <ErrorText className="mt-3 text-center">{error}</ErrorText>
            )}
          </div>
          <div
            ref={chatBoxRefScrollCallback}
            className="flex-1 overflow-y-auto overflow-x-hidden pr-4"
          >
            {loading === "loadingMessages" ? (
              <Spinner />
            ) : (
              <ChatMessageList data={messages} />
            )}
          </div>
          <div className="pr-4">
            <div className="min-h-14 w-full bg-[var(--bg-chat-input)] rounded-xl drop-shadow-md flex items-center gap-4 px-4 py-2">
              <textarea
                className="bg-transparent flex-1 h-full outline-none resize-none placeholder-[var(--text-color-muted)]"
                rows={1}
                placeholder="Write your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex gap-1">
                <EmojiPickerButton onSelect={handleEmojiSelect} />
                {/* <IconButton
                  icon={faPaperclip}
                  title="Attach file"
                  className="text-[var(--text-color-muted)] active:text-[var(--text-color-muted-active)]"
                /> */}
                <IconButton
                  icon={faPaperPlane}
                  title="Send"
                  className="ml-2"
                  fill
                  isLoading={loading === "sendingMessage"}
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Chat;
