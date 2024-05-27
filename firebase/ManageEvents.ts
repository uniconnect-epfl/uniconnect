import { collection, doc, getDocs, orderBy, query, setDoc, where, getDoc, DocumentData } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast, showSuccessToast } from "../components/ToastMessage/toast"
import { Point } from "react-native-maps"
import { Event } from "../types/Event"

export async function createEvent(title: string, description: string, date: string, point: Point, location: string, imageUrl: string, userId: string, interests: string[]): Promise<string | undefined> {
  try {
    const eventRef = doc(collection(db, "events"))
    await setDoc(eventRef, {
      uid: eventRef.id,
      title: title,
      point: point,
      location: location,
      date: date,
      description: description,
      imageUrl: imageUrl,
      participants: [userId],
      host: userId,
      interests: interests,
    })
    showSuccessToast("Event created successfully!")
    return eventRef.id
  } catch (error) {

    showErrorToast("There was an error storing your event data, please try again.")
  }
  return undefined
}

const formatEvent = (doc: DocumentData) => {
  return {
    uid: doc.data().uid as string,
    title: doc.data().title as string,
    location: doc.data().location as string,
    point: doc.data().point as Point,
    description: doc.data().description as string,
    date: doc.data().date as string,
    imageUrl: doc.data().imageUrl as string,
    participants: doc.data().participants as string[],
    host: doc.data().host as string,
    interests: doc.data().interests as string[]
  }
}

export const getAllPastEvents = async () => {
  try {
    // Reference to the events collection
    const eventsRef = collection(db, "events")

    // Create a query against the collection.
    const nowIsoString = new Date().toISOString()

    // This query retrieves events where the eventDate is less than the current date and time.
    const q = query(eventsRef, where("date", "<", nowIsoString), orderBy("date", "desc"))
    // Execute the query
    const querySnapshot = await getDocs(q)
    const events: Event[] = querySnapshot.docs.map((doc) => (
      formatEvent(doc)
    )
    )
    return events
  } catch (error) {
    showErrorToast("Error fetching events. Please check your connection and try again.")
    return []
  }
}

export const getAllFutureEvents = async () => {
  try {
    // Reference to the events collection
    const eventsRef = collection(db, "events")

    const nowIsoString = new Date().toISOString()

    // Create a query against the collection.
    // This query retrieves events where the eventDate is greater than the current date and time.
    const q = query(eventsRef, where("date", ">", nowIsoString), orderBy("date", "asc"))

    // Execute the query
    const querySnapshot = await getDocs(q)
    const events: Event[] = querySnapshot.docs.map((doc) => (
      formatEvent(doc)
    )
    )
    return events
  } catch (error) {
    showErrorToast("Error fetching events. Please check your connection and try again.")
    return []
  }
}

export const getEventData = async (eventUid: string) => {
  try {
    const docRef = doc(db, "events", eventUid)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as DocumentData
      const event: Event = {
        uid: data.uid,
        title: data.title,
        location: data.location,
        point: data.point,
        description: data.description,
        date: data.date,  // Assuming 'date' is stored as a Firestore Timestamp
        imageUrl: data.imageUrl,
        participants: data.participants,
        host: data.host,
        interests: data.interests
      }
      return event
    } else {
      console.log("No such document!")
      return undefined
    }
  } catch (error) {
    showErrorToast("Error fetching event data. Please check your connection and try again.")
  }
}

export const updateEventData = async (eventUid: string, userId: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "events", eventUid)
    const docSnapshot = await getDoc(docRef)
    const event = docSnapshot.data() as Event
    const index = event.participants.indexOf(userId)
    index === -1 ?  event.participants.push(userId): event.participants.splice(index, 1)
    await setDoc(docRef, event, { merge: true })
    return true

  } catch (error) {
    showErrorToast("Error fetching event data. Please check your connection and try again.")
    return false
  }
}
