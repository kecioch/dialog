import React from "react";
import Drawer from "./Drawer";
import DrawerSubHeading from "./DrawerSubHeading";
import { PasskeyList } from "./passkeys/PasskeyList";

interface Props {
  onClose: () => void;
}

const DrawerSettings = ({ onClose }: Props) => {
  return (
    <Drawer key="settings" title="Settings" onClose={onClose}>
      <DrawerSubHeading>Passkeys</DrawerSubHeading>
      <PasskeyList />
    </Drawer>
  );
};

export default DrawerSettings;
