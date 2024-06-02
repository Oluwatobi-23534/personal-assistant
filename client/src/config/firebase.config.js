import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALqnf-ZnaSYCB37NZk5ouZOmt4EfQS-7Q",
  authDomain: "personal-assistant-f9b8b.firebaseapp.com",
  projectId: "personal-assistant-f9b8b",
  storageBucket: "personal-assistant-f9b8b.appspot.com",
  messagingSenderId: "267727729251",
  appId: "1:267727729251:web:6ee51c4842ac6e90df7e56",
  measurementId: "G-D8M4JMD8XK",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export {app}