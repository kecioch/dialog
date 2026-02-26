import { createContext, useContext, useEffect, useState } from "react";
import { NewUser, Passkey, User } from "../types/auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: (code: string) => Promise<void>;
  loginPasskey: () => Promise<void>;
  fetchPasskeys: () => Promise<Passkey[]>;
  deletePasskey: (id: string) => Promise<void>;
  registerPasskey: () => Promise<Passkey>;
  register: (data: NewUser) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const BASE_URL = process.env.REACT_APP_API_URL + "/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check on start whether user is logged in
  useEffect(() => {
    fetch(BASE_URL, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  /*
  ##############################################################
    STANDARD LOGIN
  ##############################################################
  */

  const login = async (email: string, password: string) => {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    setUser(data.user);
  };

  const register = async (newUser: NewUser) => {
    const res = await fetch(BASE_URL + "/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newUser }),
    });

    if (!res.ok) {
      const errData = await res
        .json()
        .catch(() => ({ message: "Registration failed" }));
      throw errData;
    }

    const data = await res.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch(BASE_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  /*
  ##############################################################
    SOCIAL LOGIN
  ##############################################################
  */

  const loginGoogle = async (code: string) => {
    const res = await fetch(BASE_URL + "/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code }),
    });

    if (!res.ok) throw new Error("Google login failed");

    const data = await res.json();
    setUser(data.user);
  };

  /*
  ##############################################################
      PASSKEY LOGIN
  ##############################################################
  */

  const fetchPasskeys = async () => {
    const res = await fetch(BASE_URL + "/passkeys", { credentials: "include" });
    const data = await res.json();
    return data.passkeys;
  };

  const deletePasskey = async (id: string) => {
    const res = await fetch(BASE_URL + "/passkeys/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete passkey");
  };

  const loginPasskey = async () => {
    const optRes = await fetch(BASE_URL + "/passkeys/login/options", {
      method: "POST",
      credentials: "include",
    });
    if (!optRes.ok) throw new Error("Failed to get passkey options");

    const { startAuthentication } = await import("@simplewebauthn/browser");
    const authentication = await startAuthentication({
      optionsJSON: await optRes.json(),
    });

    const verifyRes = await fetch(BASE_URL + "/passkeys/login/verify", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authentication),
    });
    if (!verifyRes.ok) throw new Error("Passkey login failed");

    const data = await verifyRes.json();
    setUser(data.user);
  };

  const registerPasskey = async () => {
    const optRes = await fetch(BASE_URL + "/passkeys/register/options", {
      method: "POST",
      credentials: "include",
    });
    if (!optRes.ok) throw new Error("Failed to get registration options");

    const { startRegistration } = await import("@simplewebauthn/browser");
    const registration = await startRegistration({
      optionsJSON: await optRes.json(),
    });

    const verifyRes = await fetch(BASE_URL + "/passkeys/register/verify", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    });
    if (!verifyRes.ok) throw new Error("Passkey registration failed");

    const data = await verifyRes.json();
    return data.passkey;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginGoogle,
        loginPasskey,
        fetchPasskeys,
        deletePasskey,
        register,
        registerPasskey,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
};
