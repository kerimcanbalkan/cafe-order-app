import { createContext, useContext, useEffect, useState } from "react";
import { getUserMe } from "@/api/user";
import { loginCall } from "@/api/auth";
import {useUser} from "./user";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authed, setAuthed] = useState(null);
  const {updateUser, clearUser} = useUser();

  useEffect(() => {
    // Check if token exists in localStorage on mount
    const token = localStorage.getItem("authToken");
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);

    if (token && !isTokenExpired() && user) {
      setAuthed(true);
      updateUser(user);;
    } else {
      logout();
    }
  }, []);

  const login = async (username, password) => {
    try {
      const {token, expiresIn} = await loginCall({username, password});
      if (!token || !expiresIn) throw new Error("Wrong Username, or Password");

      const expirationTime = new Date().getTime() + expiresIn * 1000; // expiresIn is in seconds
      localStorage.setItem("authToken", token);
      localStorage.setItem("tokenExpiration", expirationTime.toString());

      const user = await getUserMe(token);
      if (!user) throw new Error("Could not retrieve user details.");

      setAuthed(true);
      updateUser(user);

      return user;
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    setAuthed(false);
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (!expirationTime) return true;  // No token, consider expired
  return new Date().getTime() > parseInt(expirationTime);  // If current time is greater than expiration time
};

export const useAuth = () => useContext(AuthContext);
