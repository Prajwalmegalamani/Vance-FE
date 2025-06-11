import { createContext, useEffect, useState } from "react";
import { storage } from "../lib/storage";

export const AuthContext = createContext({
  user: null,
  handleLogout: () => {},
  handleLogin: (user: any) => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = storage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    storage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleLogin = (user: any) => {
    storage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogout, handleLogin, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
