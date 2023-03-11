import React, { createContext, useState, useEffect } from "react";
import { read_cookie } from "sfcookies";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState("This is coming from Context JS");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const API_URL = `localhost:3000`;

  useEffect(() => {
    setIsLoggedIn(true);
    read_cookie("isLoggedIn");
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, API_URL, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
