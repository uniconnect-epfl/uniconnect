import { auth } from "./firebaseConfig"

export const Logout = async () => {
  auth.signOut()
    .then(() => {
      // Logout successful
      console.log('User logged out')
    })
    .catch((error) => {
      // An error occurred during logout
      console.error('Logout error:', error)
    })
}