import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RouteProtected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
