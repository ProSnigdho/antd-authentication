// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1avx5szZbfynAd_-kszdrNf-d7jOeXuc",
  authDomain: "auth-authentication-66234.firebaseapp.com",
  projectId: "auth-authentication-66234",
  storageBucket: "auth-authentication-66234.firebasestorage.app",
  messagingSenderId: "419689155535",
  appId: "1:419689155535:web:6fd08b212eea6861e760ba",
  measurementId: "G-G823F6HJSF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
