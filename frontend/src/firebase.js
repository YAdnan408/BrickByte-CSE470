// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "brickbyte-d616c.firebaseapp.com",
//   projectId: "brickbyte-d616c",
//   storageBucket: "brickbyte-d616c.firebasestorage.app",
//   messagingSenderId: "643092496981",
//   appId: "1:643092496981:web:7b9fde9a16051d670d4adc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export { app };
// export default app;



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "brickbyte-bad8a.firebaseapp.com",
  projectId: "brickbyte-bad8a",
  storageBucket: "brickbyte-bad8a.firebasestorage.app",
  messagingSenderId: "396752928755",
  appId: "1:396752928755:web:8de66d15789b7f9c409c86"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
