import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast } from "../components/ToastMessage/toast"
import { Event } from "../types/Event"

export const getEventData = async(uid: string) => {
  try{
    const docRef = doc(db, "events", uid)
    const event = await getDoc(docRef)
    return event.data() as Event
  } catch (error) {
    showErrorToast("Error fetching user data. Please check your connection and try again.")
    return null
  }
}