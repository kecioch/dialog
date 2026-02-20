import React, { useEffect, useState } from "react";
import NavbarButton from "./NavbarButton";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitchButton = () => {
  const [currTheme, setCurrTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = currTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrTheme(newTheme);
  };

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "light";

    setCurrTheme(current);
  }, []);

  return (
    <NavbarButton
      icon={currTheme === "light" ? faMoon : faSun}
      title={`Switch to ${currTheme === "dark" ? "Lightmode" : "Darkmode"}`}
      onClick={toggleTheme}
    />
  );
};

export default ThemeSwitchButton;
