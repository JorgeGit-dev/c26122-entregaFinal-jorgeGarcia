import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

/* ==========================================================
   INICIAR SESIÓN
========================================================== */

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.code);

    return {
      success: false,
      error: error.code,
    };
  }
};

/* ==========================================================
   CERRAR SESIÓN
========================================================== */

export const logoutUser = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al cerrar sesión:", error.code);

    return {
      success: false,
      error: error.code,
    };
  }
};

/* ==========================================================
   OBSERVAR AUTENTICACIÓN
========================================================== */

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/* ==========================================================
   USUARIO ACTUAL
========================================================== */

export const getCurrentUser = () => auth.currentUser;
