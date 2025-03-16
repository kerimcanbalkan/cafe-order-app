import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

function RequireAuth({ children, allowedRole }) {
  const { authed, role } = useAuth();

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
