import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 

export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null);
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    let TokenStorage = localStorage.getItem("token");
    if (TokenStorage) {
      setToken(TokenStorage);
      try {
        let decoded = jwtDecode(TokenStorage);
        setUserData(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
