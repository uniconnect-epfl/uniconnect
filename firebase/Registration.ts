import { auth } from "./firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"


export const createAccount = async (email: string, password: string) => {
 try {
  await createUserWithEmailAndPassword(auth, email, password)
  alert("Account created. Check email")
 } catch (error) {
  if (error instanceof Error) {
   // Type-guard check
  }
  alert("There was an error" + error)
 }
}