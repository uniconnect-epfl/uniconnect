import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast } from "../components/ToastMessage/toast"
import { User } from "../types/User"

export const getUserData = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid)
    const user = await getDoc(docRef)
    return user.data() as User
  } catch (error) {
    showErrorToast(
      "Error fetching user data. Please check your connection and try again."
    )
    return null
  }
}
