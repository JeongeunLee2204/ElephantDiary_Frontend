import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export default function PrivateRoute({
  isAuthenticated,
  children,
}: PrivateRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
