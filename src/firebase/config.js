// Import the functions you need from the SDKs you need

// TODO: Agrega los SDK de los productos de Firebase que quieras usar
// https://firebase.google.com/docs/web/setup#available-libraries

// ✅ Configuración de Firebase de tu aplicación web

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfCXgJmhtpLqkTRNkhUcSpkpZMVM3OIuQ",
  authDomain: "mibase1-9a0ed.firebaseapp.com",
  projectId: "mibase1-9a0ed",
  storageBucket: "mibase1-9a0ed.firebasestorage.app",
  messagingSenderId: "191537592743",
  appId: "1:191537592743:web:e87308fbc03f6fce93de82",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);