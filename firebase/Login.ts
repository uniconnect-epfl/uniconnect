import { User } from "firebase/auth"
import { FIREBASE_AUTH } from "./firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

export const loginEmailPassword = async ( email: string, password: string): Promise<User | null> => {
  let user = null
  try {
    const userCredential = await signInWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
    )
    user = userCredential.user
    console.log(user)
  } catch (error) {
    if (error instanceof Error) {
    // Type-guard check
    }
    alert("There was an error" + error)
  }
  return user
}
