// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ui-scheduler.firebaseapp.com",
  projectId: "ui-scheduler",
  storageBucket: "ui-scheduler.appspot.com",
  messagingSenderId: "497471606171",
  appId: "1:497471606171:web:4eeeb0c4c848967129a53e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);