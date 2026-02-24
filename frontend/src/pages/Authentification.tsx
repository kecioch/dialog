import React from "react";
import LogoBig from "../components/ui/LogoBig";
import ButtonNavLink from "../components/ui/ButtonNavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "../components/form/LoginForm";
import SignupForm from "../components/form/SignupForm";

interface Props {
  loginMode: boolean;
}

const Authentification = ({ loginMode }: Props) => {
  return (
    <div className="min-h-screen from-[var(--primary-700)] to-[var(--primary-500)] bg-gradient-to-br flex">
      <section className="flex-1 flex flex-col mb-40">
        <nav className="h-20 flex justify-between items-center p-10">
          <LogoBig />
          <ButtonNavLink to="/">Back to home</ButtonNavLink>
        </nav>
        <div className="flex-1 flex flex-col justify-center items-center gap-14 text-[var(--neutral-100)]">
          <h1 className="uppercase text-4xl xl:text-6xl text-center font-thin drop-shadow-2xl">
            {loginMode ? "Login" : "Signup"}
          </h1>
          <FontAwesomeIcon
            icon={loginMode ? faSignIn : faUserPlus}
            className="text-[10em] xl:text-[15em] drop-shadow-xl"
          />
        </div>
      </section>
      <main className="bg-[var(--neutral-100)] w-[100%]  max-w-[40em] rounded-l-3xl flex flex-col items-center">
        <div className="h-20 w-full flex justify-end items-center p-10">
          <ButtonNavLink to={loginMode ? "/signup" : "/login"} primaryColor>
            {loginMode ? "Signup" : "Login"}
          </ButtonNavLink>
        </div>
        <div className="w-[25em] flex-1 flex flex-col justify-center mb-40">
          {loginMode ? <LoginForm /> : <SignupForm />}
        </div>
      </main>
    </div>
  );
};

export default Authentification;
