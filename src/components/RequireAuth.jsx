import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useUser } from "@/context/user";

function RequireAuth({ children, allowedRole }) {
  const { authed } = useAuth();
  const {user} = useUser();

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
