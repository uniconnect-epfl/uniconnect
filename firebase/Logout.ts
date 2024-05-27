import { destroyGraphFileIfExists } from "../components/Graph/GraphFileFunctions"
import { auth } from "./firebaseConfig"

export const Logout = async () => {
  auth
    .signOut()
    .then(() => {
      // Logout successful
      destroyGraphFileIfExists()
      console.log("User logged out")
    })
    .catch((error) => {
      // An error occurred during logout
      console.error("Logout error:", error)
    })
}
