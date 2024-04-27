import { User } from "firebase/auth"
import { auth } from "./firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { showErrorToast, showSuccessToast } from "../components/ToastMessage/toast"
import { codeToMessage } from "./Errors"

export const loginEmailPassword = async ( email: string, password: string): Promise<User | null> => {
  let user = null
  try {
    const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
    )
    user = userCredential.user
  } catch (error) {
    let errorMessage : string = "An error has occured: " + error
    if (error instanceof FirebaseError) {
      errorMessage = codeToMessage(error.code)
    }
    showErrorToast(errorMessage)
    return null
  }
  showSuccessToast("Welcome back 👋")
  return user
}
