import {createContext, useContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{user, updateUser, clearUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
