import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import FormDivider from "./FormDivider";
import { ReactComponent as IconGoogle } from "../../assets/icons/icon-google.svg";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login(email, password)
      .catch((err) => {
        setError("Login failed");
      })
      .finally(() => setIsLoading(false));
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
        <Button className="mt-4 w-full" isLoading={isLoading} fill>
          Login
        </Button>
      </form>
      <FormDivider />
      <div className="flex flex-col gap-4">
        <Button className="w-full" disabled={isLoading} flex>
          <IconGoogle />
          Continue with Google
        </Button>
        <Button className="w-full" disabled={isLoading} flex>
          <FontAwesomeIcon icon={faKey} />
          Sign in with Passkey
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
