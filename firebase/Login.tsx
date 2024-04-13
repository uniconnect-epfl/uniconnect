import { User } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import {
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
} from "firebase/auth";

export const loginEmailPassword = async (
 email: string,
 password: string
): Promise<User | null> => {
 let user = null;
 try {
  const userCredential = await signInWithEmailAndPassword(
   FIREBASE_AUTH,
   email,
   password
  );
  user = userCredential.user;
  console.log(user);
 } catch (error) {
  if (error instanceof Error) {
   // Type-guard check
  }
  alert("There was an error" + error);
 }
 return user;
};

export const createAccount = async (email: string, password: string) => {
 try {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  alert("Account created. Check email");
 } catch (error) {
  if (error instanceof Error) {
   // Type-guard check
  }
  alert("There was an error" + error);
 }
};
