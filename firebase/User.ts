import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast } from "../components/ToastMessage/toast"
import { User } from "../types/User"

export const getUserData = async(uid: string) => {
  try{
    const docRef = doc(db, "users", uid)
    const user = await getDoc(docRef)
    return user.data() as User
  } catch (error) {
    showErrorToast("Error fetching user data. Please check your connection and try again.")
    return null
  }
}

export const updateUserData = async (uid: string, newData: Partial<User>) => {
  try {
    const docRef = doc(db, "users", uid)
    await updateDoc(docRef, newData)
    return true
  } catch (error) {
    showErrorToast("Error updating user data. Please check your connection and try again.")
    return false
  }
}