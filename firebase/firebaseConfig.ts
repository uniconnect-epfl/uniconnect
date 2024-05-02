import { initializeAuth, getReactNativePersistence } from "firebase/auth"
//@ts-expect-error - getReatNativePersistence is not a named export
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from "firebase/app" 
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm7yrRyvuab7FpOaZsZFPqaNv8qmU3jRc",
    authDomain: "uniconnect-4f311.firebaseapp.com",
    projectId: "uniconnect-4f311",
    storageBucket: "uniconnect-4f311.appspot.com",
    messagingSenderId: "618676460374",
    appId: "1:618676460374:web:535523ae4991d45b1fd4f7"
} 

// web: 618676460374-5h642avt17te1uj9qo8imr233gb6n3qj.apps.googleusercontent.com
// ios: 618676460374-9lv7cou7heq4l43tlth9tonkp0l7b007.apps.googleusercontent.com
// android: 618676460374-hoqqpkp3k8j3psq88fmkdlvle4n2aa1s.apps.googleusercontent.com

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig) 
export const db = getFirestore(FIREBASE_APP)
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})


