// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "personal-assistant-f9b8b.firebaseapp.com",
  projectId: "personal-assistant-f9b8b",
  storageBucket: "personal-assistant-f9b8b.appspot.com",
  messagingSenderId: "267727729251",
  appId: "1:267727729251:web:6ee51c4842ac6e90df7e56",
  measurementId: "G-D8M4JMD8XK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

