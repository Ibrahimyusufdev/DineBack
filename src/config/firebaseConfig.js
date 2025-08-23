<<<<<<< HEAD

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu96QIn_lR9Rvb3PUL-0POMKB0DfFbwp0",
  authDomain: "dineback-667f3.firebaseapp.com",
  projectId: "dineback-667f3",
  storageBucket: "dineback-667f3.firebasestorage.app",
  messagingSenderId: "383752189812",
  appId: "1:383752189812:web:19a9b274072cd333265e21",
  measurementId: "G-HRES3G4PW4"
=======
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
>>>>>>> 242e13b292e6bdf8b507978b1c1d04640518d210
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
const analytics = getAnalytics(app);
// Initialize Auth
export const auth = getAuth(app);
=======

// Initialize Auth
export const auth = getAuth(app);
>>>>>>> 242e13b292e6bdf8b507978b1c1d04640518d210
