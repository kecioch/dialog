import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import FormDivider from "./FormDivider";
import { useAuth } from "../../hooks/useAuth";
import AuthButtonGoogle from "./AuthButtonGoogle";

type ErrorAPI = {
  code?: string;
  message: string;
};

const SignupForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorAPI | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (honeypot.length > 0) return;
    setIsLoading(true);
    setError(null);
    register({ email, firstName, lastName, password })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-12">
      <AuthButtonGoogle
        className="w-full"
        disabled={isLoading}
        setError={(text) => setError({ message: text })}
      >
        Register with Google
      </AuthButtonGoogle>
      <FormDivider />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <FormInput
            id="firstName"
            placeholder="First Name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            required
          >
            First Name
          </FormInput>
          <FormInput
            id="lastName"
            placeholder="Last Name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            required
          >
            Last Name
          </FormInput>
        </div>
        <FormInput
          id="email"
          placeholder="E-Mail Adress..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          error={error?.code === "EMAIL_EXISTS"}
          required
        >
          E-Mail Adress
        </FormInput>
        <FormInput
          id="password"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        >
          Password
        </FormInput>

        {/* Honeypot - hidden from real users */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] -top-[9999px] overflow-hidden"
        >
          <label htmlFor="mel">Mel</label>
          <input
            id="mel"
            name="mel"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        {error && <p className="text-red-700 mt-2 text-sm">{error.message}</p>}
        <Button className="mt-4 w-full" isLoading={isLoading} fill>
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
