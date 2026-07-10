import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  loginUser,
  logoutUser,
  observeAuthState,
} from "./authService";

/* ==========================================================
   AUTH PROVIDER
========================================================== */

export const AuthProvider = ({ children }) => {
  /* ========================================================
     ESTADOS
  ======================================================== */

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ========================================================
     EFECTO DE AUTENTICACIÓN
  ======================================================== */

  useEffect(() => {
  const unsubscribe = observeAuthState((firebaseUser) => {
    setUser(firebaseUser);
    setLoading(false);
  });

  return unsubscribe;
}, []);

  /* ========================================================
     ACCIONES
  ======================================================== */

  const login = async (email, password) => {
    const result = await loginUser(email, password);

    return result;
  };

  const logout = async () => {
    const result = await logoutUser();

    return result;
  };

  /* ========================================================
     CONTEXTO MEMORIZADO
  ======================================================== */

  const authValue = useMemo(
  () => ({
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }),
  [user, loading]
);

  /* ========================================================
     PROVIDER
  ======================================================== */

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
