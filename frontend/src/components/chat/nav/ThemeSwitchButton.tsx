import React, { useEffect, useState } from "react";
import NavbarButton from "./NavbarButton";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


type Theme = "light" | "dark" | null;

const ThemeSwitchButton = () => {
  const [currTheme, setCurrTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    const newTheme = currTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

   // Determine initial theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    
    let initialTheme: Theme;
    if(savedTheme) initialTheme = savedTheme;
    else {
      // Fallback to system pref
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = systemPrefersDark ? "dark" : "light"; 
    }

    document.documentElement.setAttribute("data-theme", initialTheme);
    setCurrTheme(initialTheme);
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
