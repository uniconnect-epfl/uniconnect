import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast } from "../components/ToastMessage/toast"

export interface Interest {
  id: string
  title: string
  imageUrl?: string
  category: string
}

export const fetchInterests = async (): Promise<Interest[]> => {
  try {
    const snapshot = await getDocs(collection(db, "interests"))
    const interests: Interest[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title as string,
      imageUrl: doc.data().imageUrl as string | undefined,
      category: doc.data().category as string,
    }))
    //complete list of interests
    return interests
  } catch (error) {
    showErrorToast("Unable to fetch interests")
    throw new Error("Unable to fetch interests")
  }
}
