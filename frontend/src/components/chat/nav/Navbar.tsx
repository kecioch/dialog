import React from "react";
import LogoSmall from "../../ui/LogoSmall";
import NavbarButton from "./NavbarButton";
import {
  faGear,
  faMessage,
  faSignOut,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import ThemeSwitchButton from "./ThemeSwitchButton";
import { useAuth } from "../../../hooks/useAuth";
import { DrawerView } from "../drawer/Drawer";
import { AnimatePresence } from "framer-motion";

interface Props {
  className?: string;
  drawerView: DrawerView;
  onOpenDrawer: (view: DrawerView) => void;
}

const Navbar = ({ className, drawerView, onOpenDrawer }: Props) => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <section
      className={`flex flex-col justify-between items-center py-7 ${className}`}
    >
      <LogoSmall />
      <nav className="flex flex-col justify-center items-center gap-5 text-2xl">
        <AnimatePresence>
          <NavbarButton
            icon={faMessage}
            title="Chats"
            active={drawerView === null}
            onClick={() => onOpenDrawer(null)}
          />
          <NavbarButton
            icon={faUserGroup}
            title="Contacts"
            active={drawerView === "contacts"}
            onClick={() => onOpenDrawer("contacts")}
          />
          <div className="h-[1.5px] w-full bg-[var(--primary-700)]" />
          <NavbarButton
            icon={faGear}
            title="Settings"
            active={drawerView === "settings"}
            onClick={() => onOpenDrawer("settings")}
          />
          <ThemeSwitchButton />
          <NavbarButton
            icon={faSignOut}
            title="Logout"
            onClick={handleLogout}
          />
        </AnimatePresence>
      </nav>
      <Avatar
        className="border-[1.5px] border-[var(--secondary-500)] drop-shadow-lg"
        name={user?.firstName + " " + user?.lastName}
        rounded
      />
    </section>
  );
};

export default Navbar;
