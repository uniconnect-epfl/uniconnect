import { Timestamp, collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast, showSuccessToast } from "../components/ToastMessage/toast"
import { Point } from "react-native-maps"
import { Event } from "../types/Event"

export async function createEvent(uid: string, title: string, description: string, date: Date, point: Point, location: string, imageUrl: string) {
  try {
    const newCityRef = doc(collection(db, "events"))
    await setDoc(newCityRef, {
      uid: uid,
      title: title,
      point: point,
      location: location,
      date: date,
      description: description,
      imageUrl: imageUrl,
    })

    showSuccessToast("Event created successfully!")
  } catch (error) {
    showErrorToast("There was an error storing your event data, please try again.")
  }
}

const formatEvent = (doc): Event => {
  const data = doc.data()
  const data2 = doc.data() as Event
  const eventDate: Date = data.date.toDate()

  const event = {
    ...data2,
    uid: doc.id,
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
    console.log("Fetching past events")
    const q = query(eventsRef, where("date", "<", new Date()), orderBy("date", "desc"))

    console.log("Querying past events")
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

export const getEventData = async(eventUid: string) => {
  //----------------------------------------
  // return a dummy event for the moment
  // ---------------------------------------
  const dummyPoint: Point = {
    x : 40.712776,
    y : -74.005974
  }

  return {
    uid: eventUid,
    title: "Title of the event right at the start",
    location: "Central Park",
    point: dummyPoint,
    date: new Date(), // current date and time
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor morbi non arcu risus quis. Mattis molestie a iaculis at. Tristique risus nec feugiat in fermentum posuere urna. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Sapien eget mi proin sed libero. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Suspendisse faucibus interdum posuere lorem. In mollis nunc sed id semper risus. Amet consectetur adipiscing elit ut aliquam purus. Integer enim neque volutpat ac.    ",
    imageUrl: ""
  }
}
