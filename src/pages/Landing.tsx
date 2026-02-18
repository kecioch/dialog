import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark",
    );
  };

  return (
    <div>
      <h1 className="text-blue-500">Landing</h1>
      <button className="text-red" onClick={toggleTheme}>Toogle theme</button>
      <NavLink to="/home">Home</NavLink>
      <div className="bg-red-500 w-full h-[10em] flex justify-center gap-4">
        <div className="bg-green-500 w-[5em] h-[5em]"></div>
        <div className="bg-blue-500 w-[5em] h-[5em]"></div>
      </div>
    </div>
  );
};

export default Landing;
