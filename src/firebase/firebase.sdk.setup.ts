// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1TmetZZbSuqPmRiFts-R5pAfze49DLyk",
  authDomain: "general-testing-89d84.firebaseapp.com",
  projectId: "general-testing-89d84",
  storageBucket: "general-testing-89d84.appspot.com",
  messagingSenderId: "944314077666",
  appId: "1:944314077666:web:2ec7d4c3c3bdd9e86969bb",
  measurementId: "G-B7SVXPCVT5"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDataBase = getDatabase(firebaseApp);
export{
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    // admin
  };