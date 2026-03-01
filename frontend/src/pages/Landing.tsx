import React from "react";
import styles from "./Landing.module.css";
import LogoBig from "../components/ui/LogoBig";
import ButtonNavLink from "../components/ui/ButtonNavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import TextNavLink from "../components/ui/TextNavLink";

const Landing = () => {
  return (
    <div className="min-h-svh from-[var(--primary-700)] to-[var(--primary-500)] bg-gradient-to-br flex flex-col">
      <nav className="h-20 flex justify-between items-center p-4 pr-6 sm:p-10">
        <LogoBig />
        <div className="flex gap-8 justify-center items-center">
          <TextNavLink to="/login" className="text-[var(--neutral-100)]">
            Login
          </TextNavLink>
          <ButtonNavLink to="/signup" className="hidden sm:block">Signup</ButtonNavLink>
        </div>
      </nav>
      <main className="flex flex-1 justify-center items-center flex-wrap">
        <div className="w-full sm:w-[60%] flex justify-center items-center">
          <div className="flex justify-center items-start flex-col gap-10">
            <h1 className="text-5xl/snug xl:text-7xl/snug uppercase font-thin text-[var(--neutral-100)]">
              Chat from <br />
              everywhere.
            </h1>
            <ButtonNavLink
              to="/signup"
              className="text-xl py-3 px-11 drop-shadow-lg hover:translate-x-1 active:translate-x-1"
            >
              Get started
            </ButtonNavLink>
            <div className="mt-32 flex flex-col gap-2">
              <p className="uppercase text-[var(--secondary-500)]">
                Developed by Kevin Cioch
              </p>
              <a
                href="https://www.github.com/kecioch/dialog"
                target="_blank"
                rel="noreferrer"
                draggable={false}
                className="uppercase text-[var(--secondary-500)] border-[var(--secondary-500)] 
                text-center border-[1.5px] p-2 rounded-lg flex  justify-center items-center gap-2
                transition-all duration-300
                hover:text-[var(--accent-500)] hover:border-[var(--accent-500)]
                active:scale-[102%]"
              >
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
                View source code
              </a>
            </div>
          </div>
        </div>
        <div
          className={`hidden sm:block w-[40%] h-[45em] bg-contain bg-right bg-no-repeat ${styles.heroImage}`}
        />
      </main>
    </div>
  );
};

export default Landing;
