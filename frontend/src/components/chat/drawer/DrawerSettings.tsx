import React from "react";
import Drawer from "./Drawer";
import DrawerSubHeading from "./DrawerSubHeading";
import Button from "../../ui/Button";

interface Props {
  onClose: () => void;
}

const DrawerSettings = ({ onClose }: Props) => {
    const handleAddNewPasskey = () => {

    }
  
    return (
    <Drawer key="settings" title="Settings" onClose={onClose}>
      <DrawerSubHeading>Passkeys</DrawerSubHeading>
      <div className="flex justify-center">
        <Button className="w-[90%] text-sm py-2 " fill onClick={handleAddNewPasskey}>
          Add new Passkey
        </Button>
      </div>

    </Drawer>
  );
};

export default DrawerSettings;
