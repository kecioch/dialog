import React, { useState } from "react";
import Navbar from "../components/chat/nav/Navbar";
import ChatList from "../components/chat/ChatList";
import Chat from "../components/chat/Chat";
import { DrawerView } from "../components/chat/drawer/Drawer";
import { AnimatePresence } from "framer-motion";
import DrawerSettings from "../components/chat/drawer/DrawerSettings";
import DrawerContacts from "../components/chat/drawer/DrawerContacts";
import { ChatData, Contact } from "../types/chat";
import { useChatList } from "../hooks/useChatList";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const {
    chats,
    loading,
    error,
    updateLastMessage,
    markAsRead,
    deleteChat,
    addNewChat,
  } = useChatList();
  const [selectedChat, setSelectedChat] = useState<ChatData>();
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [drawerView, setDrawerView] = useState<DrawerView>(null);

  const handleSelectChat = (chat: ChatData) => {
    setSelectedChat(chat);
    setSelectedContact(undefined);
    // Clear unread messages
    markAsRead(chat.id);
  };

  const otherUser = selectedChat
    ? chats
        .find((c) => c.id === selectedChat.id)
        ?.users.find((u) => u.user.id !== user?.id)
    : undefined;

  const handleSelectContact = (contact: Contact) => {
    const existingChat = chats.find((chat) =>
      chat.users.some((u) => u.user.id === contact.id),
    );
    if (existingChat) {
      setSelectedChat(existingChat);
      setSelectedContact(undefined);
      // Clear unread messages
      markAsRead(existingChat.id);
    } else {
      setSelectedContact(contact);
      setSelectedChat(undefined);
    }
    setDrawerView(null);
  };

  const handleChatCreated = (newChat: ChatData) => {
    addNewChat(newChat);
    setSelectedChat(newChat);
    setSelectedContact(undefined);
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    setSelectedChat(undefined);
    setSelectedContact(undefined);
  };

  const handleCloseDrawer = () => setDrawerView(null);

  return (
    <div className="w-full h-screen flex from-[var(--bg-gradient-from)] to-[var(--bg-gradient-to)] bg-gradient-to-br theme-transition">
      <Navbar
        className="min-w-[4em]"
        drawerView={drawerView}
        onOpenDrawer={(view) => setDrawerView(view)}
      />
      <main className="isolate relative flex-1 bg-[var(--bg-chatlist)] rounded-l-3xl flex pr-8 min-w-0 min-h-0 theme-transition">
        <div className="relative min-w-[20em] w-[20%] text-[var(--text-color-chatlist)] overflow-hidden py-10 flex">
          <ChatList
            data={chats}
            loading={loading === "loadingChats"}
            error={error}
            className="max-h-full"
            selectedChat={selectedChat}
            onSelect={handleSelectChat}
            onStartNewChat={() => setDrawerView("contacts")}
          />

          <AnimatePresence>
            {drawerView === "contacts" && (
              <DrawerContacts
                onClose={handleCloseDrawer}
                onSelectContact={handleSelectContact}
              />
            )}
            {drawerView === "settings" && (
              <DrawerSettings onClose={handleCloseDrawer} />
            )}
          </AnimatePresence>
        </div>
        <Chat
          className="flex-1 min-w-0 my-10"
          chatData={selectedChat}
          contactData={selectedContact}
          otherUser={otherUser} 
          onChatCreated={handleChatCreated}
          onMessageSent={updateLastMessage}
          onDeleteChat={handleDeleteChat}
        />
      </main>
    </div>
  );
};

export default Home;
