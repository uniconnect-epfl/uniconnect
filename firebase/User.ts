import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db, storage } from "./firebaseConfig"
import { showErrorToast } from "../components/ToastMessage/toast"
import { User } from "../types/User"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

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

export const updateUserData = async (uid: string, newData: Partial<User>) => {
  try {
    const docRef = doc(db, "users", uid)
    await updateDoc(docRef, newData)
    return true
  } catch (error) {
    showErrorToast(
      "Error updating user data. Please check your connection and try again."
    )
    return false
  }
}

export const uploadUserImageToStorage = async (uid: string, uri: string) => {
  let url = ""
  const blob: Blob | null = await new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = () => {
      showErrorToast(
        "Network request failed. Please check your connection and try again."
      )
      resolve(null)
    }
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })
  if (!blob) {
    return null
  }

  const fileRef = ref(storage, `users/${uid}.jpg`)

  try {
    await uploadBytes(fileRef, blob)
    url = await getDownloadURL(fileRef)
  } catch (error) {
    showErrorToast(
      "Error storing image. Please check your connection and try again."
    )
    return null
  }
  return url
}

export const updateUserImage = async (uid: string, url: string) => {
  try {
    const docRef = doc(db, "users", uid)
    await updateDoc(docRef, { profilePicture: url })
    return true
  } catch (error) {
    showErrorToast(
      "Error updating user data. Please check your connection and try again."
    )
    return false
  }
}

// Ignore for now
export const updateUserInterests = async (uid: string, interests: string[]) => {
  try {
    const docRef = doc(db, "users", uid)
    await updateDoc(docRef, { interests })
    return true
  } catch (error) {
    showErrorToast(
      "Error updating user data. Please check your connection and try again."
    )
    return false
  }
}

export const updateUserEvents = async (
  uid: string,
  eventId: string
): Promise<boolean> => {
  try {
    //read events array and add new event
    const docRef = doc(db, "users", uid)
    const user = await getDoc(docRef)
    const user2 = user.data() as User
    let userEvents = user2.events
    if (userEvents !== undefined) {
      userEvents.forEach((event) => {
        if (event === eventId) {
          throw new Error("You are already registered to this event.")
        }
      })
      userEvents.push(eventId)
    } else {
      userEvents = [eventId]
    }
    await setDoc(
      docRef,
      {
        events: userEvents,
      },
      { merge: true }
    )
    return true
  } catch (error) {
    return false
  }
}

export const addFriend = async (user1: User, user2: User) => {
  try {
    // Get user1 data
    const user1Ref = doc(db, "users", user1.uid)
    const user1Doc = await getDoc(user1Ref)
    const user1Data = user1Doc.data() as User | undefined

    if (!user1Data) {
      throw new Error("User1 data not found")
    }

    // Get user2 data
    const user2Ref = doc(db, "users", user2.uid)
    const user2Doc = await getDoc(user2Ref)
    const user2Data = user2Doc.data() as User | undefined

    if (!user2Data) {
      throw new Error("User2 data not found")
    }

    // Update friends lists
    const updatedUser1Friends = user1Data.friends
      ? [...user1Data.friends, user2.uid]
      : [user2.uid]
    const updatedUser2Friends = user2Data.friends
      ? [...user2Data.friends, user1.uid]
      : [user1.uid]

    // Set updated data
    await setDoc(user1Ref, { friends: updatedUser1Friends }, { merge: true })
    await setDoc(user2Ref, { friends: updatedUser2Friends }, { merge: true })
    console.log(updatedUser1Friends)
    return true
  } catch (error) {
    showErrorToast("Error updating your contacts list. Please try again.")
    return false
  }
}

export const removeFriend = async (user1: User, user2: User) => {
  try {
    // Get user1 data
    const user1Ref = doc(db, "users", user1.uid)
    const user1Doc = await getDoc(user1Ref)
    const user1Data = user1Doc.data() as User | undefined

    if (user1Data == undefined) {
      throw new Error("User1 data not found")
    }

    // Get user2 data
    const user2Ref = doc(db, "users", user2.uid)
    const user2Doc = await getDoc(user2Ref)
    const user2Data = user2Doc.data() as User | undefined

    if (user2Data == undefined) {
      throw new Error("User2 data not found")
    }

    // Remove each user from the other user's friends list
    const updatedUser1Friends = user1Data.friends
      ? user1Data.friends.filter((friendUid) => friendUid !== user2.uid)
      : []
    const updatedUser2Friends = user2Data.friends
      ? user2Data.friends.filter((friendUid) => friendUid !== user1.uid)
      : []

    // Set updated data
    await setDoc(user1Ref, { friends: updatedUser1Friends }, { merge: true })
    await setDoc(user2Ref, { friends: updatedUser2Friends }, { merge: true })

    return true
  } catch (error) {
    showErrorToast("Error removing contact from your contacts")
    return false
  }
}
