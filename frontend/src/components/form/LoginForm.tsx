import React from "react";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import FormDivider from "./FormDivider";
import { ReactComponent as IconGoogle } from "../../assets/icons/icon-google.svg";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-12">
      <form className="flex flex-col gap-4">
        <FormInput id="email" placeholder="E-Mail Adress...">
          E-Mail Adress
        </FormInput>
        <FormInput
          id="password"
          placeholder="Password..."
          type="password"
        >
          Password
        </FormInput>
        <Button className="mt-4 w-full" fill>
          Login
        </Button>
      </form>
      <FormDivider />
      <div className="flex flex-col gap-4">
        <Button className="w-full" flex>
          <IconGoogle />
          Continue with Google
        </Button>
        <Button className="w-full" flex>
          <FontAwesomeIcon icon={faKey} />
          Sign in with Passkey
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
