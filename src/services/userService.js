import { auth } from "../firebase/config";

/* ==========================================================
   USUARIO ACTUAL
========================================================== */

/**
 * Devuelve el usuario autenticado actualmente.
 * Si no hay sesión iniciada retorna null.
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/* ==========================================================
   HELPERS FUTUROS
========================================================== */

/*
Aquí podrán agregarse funciones como:

- updateUserProfile()
- updateUserPhoto()
- changePassword()
- sendResetPassword()
- verifyEmail()
- deleteCurrentUser()

sin mezclar responsabilidades con authService.
*/
