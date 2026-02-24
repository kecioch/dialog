import { useAuth } from "../hooks/useAuth";
import Landing from "../pages/Landing";
import Home from "../pages/Home";

export const RootRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) return <Home />;
  return <Landing />;
};
