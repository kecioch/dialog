import React from "react";
import LogoBig from "../components/ui/LogoBig";
import ButtonNavLink from "../components/ui/ButtonNavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import LoginForm from "../components/forms/LoginForm";
import SignupForm from "../components/forms/SignupForm";

interface Props {
  loginMode: boolean;
}

const Authentification = ({ loginMode }: Props) => {
  return (
    <div className="min-h-svh from-[var(--primary-700)] to-[var(--primary-500)] bg-gradient-to-br flex flex-col justify-between lg:flex-row">
      <section className="lg:flex-1 flex flex-col lg:mb-40">
        <nav className="h-20 flex justify-between items-center p-4 sm:p-10">
          <LogoBig />
          <ButtonNavLink to="/" className="hidden lg:block">
            Back to home
          </ButtonNavLink>
        </nav>
        <div className="flex-1 hidden lg:flex flex-col justify-center items-center gap-14 text-[var(--neutral-100)]">
          <h1 className="uppercase text-4xl xl:text-6xl text-center font-thin drop-shadow-2xl">
            {loginMode ? "Login" : "Signup"}
          </h1>
          <FontAwesomeIcon
            icon={loginMode ? faSignIn : faUserPlus}
            className="text-[10em] xl:text-[15em] drop-shadow-xl"
          />
        </div>
      </section>
      <main className="bg-[var(--neutral-100)] w-[100%] lg:max-w-[40em] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl flex flex-col items-center px-10 pb-20">
        <div className="py-5 w-full flex justify-end items-center mb-3 lg:mb-0">
          <ButtonNavLink to={loginMode ? "/signup" : "/login"}  primaryColor>
            {loginMode ? "Signup" : "Login"}
          </ButtonNavLink>
        </div>
        <div className="w-full max-w-[25em]  flex-1 flex flex-col justify-center lg:mb-40">
          {loginMode ? <LoginForm /> : <SignupForm />}
        </div>
      </main>
    </div>
  );
};

export default Authentification;
