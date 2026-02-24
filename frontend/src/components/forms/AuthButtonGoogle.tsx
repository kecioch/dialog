import React from "react";
import Button from "../ui/Button";
import { ReactComponent as IconGoogle } from "../../assets/icons/icon-google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  setError: (text: string) => void;
}

const AuthButtonGoogle = ({
  className,
  disabled = false,
  children,
  setError,
}: Props) => {
  const { loginGoogle } = useAuth();

  const handleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeRes) => {
      loginGoogle(codeRes.code).catch((err) => {
        console.error(err);
        setError("Google Login Failed");
      });
    },
    onError: () => setError("Google Login Failed"),
  });

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={handleLogin}
      flex
    >
      <IconGoogle />
      {children ? children : "Continue with Google"}
    </Button>
  );
};

export default AuthButtonGoogle;
