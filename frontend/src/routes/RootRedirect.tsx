import Landing from "../pages/Landing";
import Home from "../pages/Home";
import { useAuth } from "../hooks/useAuth";

export const RootRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) return <Home />;
  return <Landing />;
};
