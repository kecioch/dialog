import React from "react";
import Drawer from "./Drawer";
import ContactList from "./contacts/ContactList";
import { Contact } from "../../../types/chat";

interface Props {
  onClose: () => void;
  onSelectContact: (contact: Contact) => void;
}

const DrawerContacts = ({ onClose, onSelectContact }: Props) => {
  return (
    <Drawer key="contacts" title="Contacts" onClose={onClose}>
      <ContactList onSelect={onSelectContact} />
    </Drawer>
  );
};

export default DrawerContacts;
