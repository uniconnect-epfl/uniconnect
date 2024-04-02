import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

//connectAuthEmulator(FIREBASE_AUTH, 'http://localhost:9099');


// export const monitorAuthState = async (): Promise<void> => {
//     onAuthStateChanged(FIREBASE_AUTH, user => {
//         if (user) {
//             console.log(user);
//         } else {
//             //TODO
//         }
//     })
// }

// export const logout = async (): Promise<void> => {
//     await signOut(FIREBASE_AUTH);
// }

