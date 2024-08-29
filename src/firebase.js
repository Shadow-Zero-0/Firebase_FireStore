// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDcZxBz0CJD5ubk8mZ1nqK9zZLTGlImjNY",
  authDomain: "shadow-3d8ba.firebaseapp.com",
  projectId: "shadow-3d8ba",
  storageBucket: "shadow-3d8ba.appspot.com",
  messagingSenderId: "937696736202",
  appId: "1:937696736202:web:cbb91f427d304923b31533"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);