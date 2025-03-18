import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useUser } from "@/context/user";
import { useLayoutEffect, useState } from "react";
import Loading from "@/components/Loading";

function RequireAuth({ children, allowedRole }) {
  const { authed } = useAuth();
  const { user } = useUser();
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    // Set isReady to true once the auth state and user data are fully loaded
    if (authed !== null) {
      setIsReady(true);
    }
  }, [authed, user]);

  // Return loading state until auth state and user are ready
  if (!isReady) {
    return <Loading/>
  }

  // If not authenticated, navigate to login
  if (authed === false) {
    return <Navigate to="/login" replace />;
  }

  // If user role doesn't match the allowed role, navigate to login
  if (user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
