// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3aab3.firebaseapp.com",
  projectId: "mern-auth-3aab3",
  storageBucket: "mern-auth-3aab3.appspot.com",
  messagingSenderId: "231279880701",
  appId: "1:231279880701:web:ea9bd216358d588cca1194"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);