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

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <section
      className={`flex flex-col justify-between items-center py-7 ${className}`}
    >
      <LogoSmall />
      <nav className="flex flex-col justify-center items-center gap-5 text-2xl">
        <NavbarButton icon={faMessage} title="Chats" active />
        <NavbarButton icon={faUserGroup} title="Contacts" />
        <div className="h-[1.5px] w-full bg-[var(--primary-700)]" />
        <NavbarButton icon={faGear} title="Settings" />
        <ThemeSwitchButton />
        <NavbarButton icon={faSignOut} title="Logout" onClick={handleLogout} />
      </nav>
      <Avatar
        className="border-[1.5px] border-[var(--secondary-500)] drop-shadow-lg"
        rounded
      />
    </section>
  );
};

export default Navbar;
