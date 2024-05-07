import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast, showSuccessToast } from "../components/ToastMessage/toast"
import { Point } from "react-native-maps"
import { Announcement } from "../types/Annoucement"

export async function createAnnouncement(uid: string, title: string, location: string, point: Point, description: string, interests: string[], date: string) {
    try {
        const newCityRef = doc(collection(db, "announcements"))
        await setDoc(newCityRef, {
            uid: uid,
            title: title,
            location: location,
            point: point,
            description: description,
            interests: interests,
            date: date
        })

        showSuccessToast("Announcement created successfully!")
    } catch (error) {
        showErrorToast("There was an error storing your event data, please try again.")
    }
}


export const getAllAnnouncements = async () => {
    try {
        // Reference to the events collection
        console.log("fetching announcements")
        // Execute the query
        const querySnapshot = await getDocs(collection(db, "announcements"))
        const announcements: Announcement[] = querySnapshot.docs.map((doc) => ({
            uid: doc.id,
            title: doc.data().title as string,
            location: doc.data().location as string,
            point: doc.data().point as Point,
            description: doc.data().description as string,
            interests: doc.data().interests as string[],
            date: doc.data().date as string,
        }))

        return announcements
    } catch (error) {
        showErrorToast("Error fetching announcements. Please check your connection and try again.")
        return null
    }
}