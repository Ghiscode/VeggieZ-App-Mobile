import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANhDkSANOxnwZ6erxfr_sq9EjaNKFF8MI",
  authDomain: "veggiez---mobile.firebaseapp.com",
  projectId: "veggiez---mobile",
  storageBucket: "veggiez---mobile.firebasestorage.app",
  messagingSenderId: "655369752773",
  appId: "1:655369752773:web:de1a5e19ba7003f0d1e0ac",
  databaseURL:
    "https://veggiez---mobile-default-rtdb.asia-southeast1.firebasedatabase.app",
};

let app;

if (getApps().length > 0) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getDatabase(app);
