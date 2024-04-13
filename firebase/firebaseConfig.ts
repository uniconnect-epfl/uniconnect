import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm7yrRyvuab7FpOaZsZFPqaNv8qmU3jRc",
    authDomain: "uniconnect-4f311.firebaseapp.com",
    projectId: "uniconnect-4f311",
    storageBucket: "uniconnect-4f311.appspot.com",
    messagingSenderId: "618676460374",
    appId: "1:618676460374:web:535523ae4991d45b1fd4f7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


