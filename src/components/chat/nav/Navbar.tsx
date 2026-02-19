import React from "react";
import LogoSmall from "../../ui/LogoSmall";
import NavbarButton from "./NavbarButton";
import { faGear, faMessage, faMoon, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  return (
    <section
      className={`flex flex-col justify-between items-center py-7 ${className}`}
    >
      <LogoSmall />
      <nav className="flex flex-col justify-center items-center gap-5 text-2xl">
        <NavbarButton icon={faMessage} title="Chats" active />
        <NavbarButton icon={faUserGroup} title="Contacts" />
        <div className="h-[1.5px] w-full bg-[var(--primary-700)]" />
        <NavbarButton icon={faMoon} title="Switch to Darkmode" />
        <NavbarButton icon={faGear} title="Settings" />
      </nav>
      <Avatar rounded />
    </section>
  );
};

export default Navbar;
