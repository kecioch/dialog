import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import FormDivider from "./FormDivider";
import { useAuth } from "../../hooks/useAuth";
import AuthButtonGoogle from "./AuthButtonGoogle";

const LoginForm = () => {
  const { login, loginPasskey } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    login(email, password)
      .catch((err) => {
        setError("Login failed");
      })
      .finally(() => setIsLoading(false));
  };

  const handlePasskeyLogin = () => {
    loginPasskey()
      .then(console.log)
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col gap-12">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          placeholder="E-Mail Adress..."
          value={email}
          type="email"
          error={!!error}
          disabled={isLoading}
          required
          onChange={(e) => setEmail(e.target.value)}
        >
          E-Mail Adress
        </FormInput>
        <FormInput
          id="password"
          placeholder="Password..."
          type="password"
          value={password}
          error={!!error}
          disabled={isLoading}
          required
          onChange={(e) => setPassword(e.target.value)}
        >
          Password
        </FormInput>
        {error && <p className="text-red-700 mt-2 text-sm">{error}</p>}
        <Button className="mt-7 w-full" isLoading={isLoading} fill>
          Login
        </Button>
      </form>
      <FormDivider />
      <div className="flex flex-col gap-4">
        <AuthButtonGoogle
          className="w-full"
          disabled={isLoading}
          setError={(text) => setError(text)}
        />
        <Button
          className="w-full"
          disabled={isLoading}
          flex
          onClick={handlePasskeyLogin}
        >
          <FontAwesomeIcon icon={faKey} />
          Sign in with Passkey
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
