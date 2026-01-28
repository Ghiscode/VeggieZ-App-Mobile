// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
// Import service Auth & Firestore agar bisa dipakai
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfigurasi dari akun Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyANhDkSANOxnwZ6erxfr_sq9EjaNKFF8MI",
  authDomain: "veggiez---mobile.firebaseapp.com",
  projectId: "veggiez---mobile",
  storageBucket: "veggiez---mobile.firebasestorage.app",
  messagingSenderId: "655369752773",
  appId: "1:655369752773:web:de1a5e19ba7003f0d1e0ac",
};

// 1. Nyalakan Firebase
const app = initializeApp(firebaseConfig);

// 2. Siapkan fitur Auth & Database untuk diexport
export const auth = getAuth(app);
export const db = getFirestore(app);
