import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { FIREBASE_AUTH, FIRESTORE_DB } from "./firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"


export const createAccount = async (email: string, password: string) => {
 try {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
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
      const docRef = await addDoc(collection(FIRESTORE_DB, "emails"), {
        email: email,
        createdAt: serverTimestamp() // Use server timestamp for consistency
      });
  
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding document: ", error.message);
        throw new Error("Failed to store email: " + error.message);
      }
    }
  }