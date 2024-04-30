import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebaseConfig"

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
    console.error("Error fetching interests:", error)
    throw new Error("Unable to fetch interests")
  }
}
