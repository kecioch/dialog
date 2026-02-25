import React from "react";
import Drawer from "./Drawer";

interface Props {
  onClose: () => void;
}

const DrawerContacts = ({ onClose }: Props) => {
  return (
    <Drawer key="contacts" title="Contacts" onClose={onClose}>
      <p>This are the Contacts</p>
    </Drawer>
  );
};

export default DrawerContacts;
