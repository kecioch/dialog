import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React, { JSX } from "react";
import LoadingPage from "../components/loading/LoadingPage";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingPage />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
