import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const safeParse = (key) => {
    try {
      const value = localStorage.getItem(key);
      if (!value || value === "undefined") return null;
      return JSON.parse(value);
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  };

  const [user, setUser] = useState(safeParse("user"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
