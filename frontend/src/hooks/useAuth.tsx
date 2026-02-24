import { createContext, useContext, useEffect, useState } from "react";
import { NewUser, User } from "../types/Auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: (code: string) => Promise<void>;
  register: (data: NewUser) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check on start whether user is logged in
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/auth", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    setUser(data.user);
  };

  const loginGoogle = async (code: string) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code }),
    });

    if (!res.ok) throw new Error("Google login failed");

    const data = await res.json();
    setUser(data.user);
  };

  const register = async (newUser: NewUser) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
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
    await fetch(process.env.REACT_APP_API_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginGoogle, register, logout }}
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
