// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "brickbyte-d616c.firebaseapp.com",
  projectId: "brickbyte-d616c",
  storageBucket: "brickbyte-d616c.firebasestorage.app",
  messagingSenderId: "643092496981",
  appId: "1:643092496981:web:7b9fde9a16051d670d4adc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
