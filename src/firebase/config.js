import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAluPgbHcD_XEI1H631rU1KMDXlmTgNo1U",
  authDomain: "meu-app-auth-92656.firebaseapp.com",
  projectId: "meu-app-auth-92656",
  storageBucket: "meu-app-auth-92656.firebasestorage.app",
  messagingSenderId: "815970493402",
  appId: "1:815970493402:web:e10bab2024d852ef6ad6e3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);