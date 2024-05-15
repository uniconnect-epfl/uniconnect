import { Timestamp, collection, doc, getDocs, orderBy, query, setDoc, where, getDoc, DocumentData } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast, showSuccessToast } from "../components/ToastMessage/toast"
import { Point } from "react-native-maps"
import { Event } from "../types/Event"

export async function createEvent(title: string, description: string, date: Date, point: Point, location: string, imageUrl: string): Promise<string | undefined> {
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
    })
    showSuccessToast("Event created successfully!")
    return eventRef.id
  } catch (error) {

    showErrorToast("There was an error storing your event data, please try again.")
  }
  return undefined
}

const formatEvent = (doc): Event => {
  const data = doc.data()
  const data2 = doc.data() as Event
  const eventDate: Date = data.date.toDate()

  const event = {
    ...data2,
    uid: data.uid,
    date: eventDate,
    point: {
      x: data.point.x,
      y: data.point.y
    }
  }
  return event

}

export const getAllPastEvents = async () => {
  try {
    // Reference to the events collection
    const eventsRef = collection(db, "events")

    // Create a query against the collection.
    // This query retrieves events where the eventDate is less than the current date and time.
    const q = query(eventsRef, where("date", "<", new Date()), orderBy("date", "desc"))

    // Execute the query
    const querySnapshot = await getDocs(q)
    const events: Event[] = []

    // Iterate through each doc in the querySnapshot and push its data into the events array
    querySnapshot.forEach((doc) => {
      events.push(formatEvent(doc))
    })

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

    const now = Timestamp.fromDate(new Date())

    // Create a query against the collection.
    // This query retrieves events where the eventDate is greater than the current date and time.
    const q = query(eventsRef, where("date", ">", now), orderBy("date", "asc"))

    // Execute the query
    const querySnapshot = await getDocs(q)
    const events: Event[] = []

    // Iterate through each doc in the querySnapshot and push its data into the events array
    querySnapshot.forEach((doc) => {
      events.push(formatEvent(doc))
    })

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
        date: data.date.toDate(),  // Assuming 'date' is stored as a Firestore Timestamp
        imageUrl: data.imageUrl,
      }
      return event
    } else {
      console.log("No such document!")
      return undefined  
    }
  } catch (error) {
    showErrorToast("Error fetching event data. Please check your connection and try again.")}
}
