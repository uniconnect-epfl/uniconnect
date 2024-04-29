import { Firestore } from "firebase/firestore"
import { Auth } from "firebase/auth"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { loginEmailPassword } from "../../firebase/Login"
import { User } from "../../types/User"
import { FirebaseError } from "firebase/app"

const mockFirebaseError = new FirebaseError("auth/invalid-credential", "test")

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({} as Auth)),
  createUserWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
    if (email === "test@example.com" && password === "password") {
      return Promise.resolve(void 0)
    } else {
      return Promise.reject(new Error("Failed to create account"))
    }
  }),
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  signInWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
    if (email === "test@example.com" && password === "password") {
      return Promise.resolve({} as User)
    }
    else if (email === "firebase@example.com") {
      return Promise.reject(mockFirebaseError as FirebaseError)
    }
    return Promise.reject(new Error("Failed to login"))
  })
}))

jest.mock("../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  addDoc: jest.fn().mockImplementation((collectionRef, data) => {
    if (data.email === "test@example.com") {
      return Promise.resolve({ id: "123" })
    }
    else {
      return Promise.reject(new Error("Failed to login"))
    }
  }),
  collection: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => ({}))
}))

describe("Login", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should login and display success message", async () => {
    const email = "test@example.com"
    const password = "password"

    await loginEmailPassword(email, password)

    expect(showSuccessToast).toHaveBeenCalledWith("Welcome back 👋")
  })

  it("should handle error and display error message", async () => {
    const email = "test@example"
    const password = "password"
    const error = new Error("Failed to login")

    await loginEmailPassword(email, password)

    expect(showErrorToast).toHaveBeenCalledWith("An error has occured: " + error)
  })

  it("should handle a firebase error and display error message", async () => {
    const email = "firebase@example.com"
    const password = "password"

    await loginEmailPassword(email, password)

    expect(showErrorToast).toHaveBeenCalledWith("An unknown error: auth/invalid-credential")
  })
})
