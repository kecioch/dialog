import React from "react";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import FormDivider from "./FormDivider";
import { ReactComponent as IconGoogle } from "../../assets/icons/icon-google.svg";

const SignupForm = () => {
  return (
    <div className="flex flex-col gap-12">
      <Button className="w-full" flex>
        <IconGoogle />
        Register with Google
      </Button>
      <FormDivider />
      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormInput
            id="firstName"
            placeholder="First Name..."
            className="w-[45%] flex-1"
          >
            First Name
          </FormInput>
          <FormInput
            id="lastName"
            placeholder="Last Name..."
            className="w-[45%] flex-1"
          >
            Last Name
          </FormInput>
        </div>
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
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
