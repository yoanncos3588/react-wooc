import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RouteForGuestOnly = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};
