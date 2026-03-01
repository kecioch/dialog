import Landing from "../pages/Landing";
import Home from "../pages/Home";
import { useAuth } from "../hooks/useAuth";

export const RootRedirect = () => {
  const { user } = useAuth();

  // if (!isLoading) return <Landing />;

  if (user) return <Home />;
  return <Landing />;
};
