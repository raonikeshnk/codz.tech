// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6_Oh6HvJWu0NmRC1PGdRk7PhsArKt7KU",
  authDomain: "codztech-d0c2a.firebaseapp.com",
  projectId: "codztech-d0c2a",
  storageBucket: "codztech-d0c2a.appspot.com",
  messagingSenderId: "698870955160",
  appId: "1:698870955160:web:028ec5e5ff45c281d3a4ed"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };


//   apiKey: "AIzaSyD6_Oh6HvJWu0NmRC1PGdRk7PhsArKt7KU",
//   authDomain: "codztech-d0c2a.firebaseapp.com",
//   projectId: "codztech-d0c2a",
//   storageBucket: "codztech-d0c2a.appspot.com",
//   messagingSenderId: "698870955160",
//   appId: "1:698870955160:web:028ec5e5ff45c281d3a4ed",
//   measurementId: "G-CQVFZYBXRW"
