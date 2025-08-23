
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Auth
export const auth = getAuth(app);