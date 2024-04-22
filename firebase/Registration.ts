import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"


export async function createAccount(email: string, password: string) : Promise<void> {
 try {
  await createUserWithEmailAndPassword(auth, email, password)
  alert("Account created. Check email")
 } catch (error) {
  if (error instanceof Error) {
   // Type-guard check
  }
  alert("There was an error" + error)
 }
}

/**
 * Stores an email in the Firestore database.
 * @param email The email address to store.
 * @returns A promise that resolves when the email is successfully stored.
 */
export async function storeEmail(email: string): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, "emails"), {
      email: email,
      createdAt: serverTimestamp() // Use server timestamp for consistency
    })

    alert("Document written with ID: " + docRef.id)
  } catch (error) {
    if (error instanceof Error) {
      // Type-guard check
    }
    alert("Failed to store email: " + error)
  }
}