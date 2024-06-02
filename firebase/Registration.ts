import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "./firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { showErrorToast, showSuccessToast } from "../components/ToastMessage/toast"
import { FirebaseError } from "firebase/app"
import { codeToMessage } from "./Errors"


export async function createAccount(email: string, password: string) {
 try {
  const user = await createUserWithEmailAndPassword(auth, email, password)
  showSuccessToast("Account succesfully created!")
  return user
 } catch (error) {
  let errorMessage = "There was a problem creating an account: " + error
  if (error instanceof FirebaseError) {
    errorMessage = codeToMessage(error.code)
  }
  showErrorToast(errorMessage)
  return null
 }
}

export async function isNewUser(uid: string) {
  try{
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return false
    }
    return true
  }
  catch (error) {
    return false
  }
}

export async function storeInitialUserData(uid: string, email: string, firstName: string, lastName: string, date: Date, location: string, description: string, selectedInterests: Array<string>) {
  try {
    const docRef = doc(db, "users", uid)
    await setDoc(docRef, {
      uid: uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      date: date,
      location: location,
      description: description,
      selectedInterests: selectedInterests,
      profilePicture: "",
      events : []
    })
  } catch (error) {
    showErrorToast("There was an error storing your user data, please try again.")
  }
}