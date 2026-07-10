import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext debe utilizarse dentro de un AuthProvider."
    );
  }

  return context;
};