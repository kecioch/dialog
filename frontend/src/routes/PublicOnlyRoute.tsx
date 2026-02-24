import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React, { JSX } from "react";

export const PublicOnlyRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) return <Navigate to="/" replace />;

  return children;
};
