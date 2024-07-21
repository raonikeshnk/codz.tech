// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;



//   apiKey: "AIzaSyD6_Oh6HvJWu0NmRC1PGdRk7PhsArKt7KU",
//   authDomain: "codztech-d0c2a.firebaseapp.com",
//   projectId: "codztech-d0c2a",
//   storageBucket: "codztech-d0c2a.appspot.com",
//   messagingSenderId: "698870955160",
//   appId: "1:698870955160:web:028ec5e5ff45c281d3a4ed",
//   measurementId: "G-CQVFZYBXRW"
