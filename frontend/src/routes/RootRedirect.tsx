import Landing from "../pages/Landing";
import Home from "../pages/Home";
import { useAuth } from "../hooks/useAuth";
import LoadingPage from "../components/loading/LoadingPage";

export const RootRedirect = () => {
  const { user, isLoading } = useAuth();

  // if (isLoading) return <LoadingPage />;

  if (user) return <Home />;
  return <Landing />;
};
