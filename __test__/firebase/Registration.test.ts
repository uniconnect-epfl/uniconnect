import { Firestore } from "firebase/firestore"
import { createAccount } from "../../firebase/Registration"
import { Auth } from "firebase/auth"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"

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
    } else {
      return Promise.reject(new Error("Failed to store email"))
    }
  }),
  collection: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => ({}))
}))

describe("createAccount", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create an account and display success message", async () => {
    const email = "test@example.com"
    const password = "password"

    await createAccount(email, password)

    expect(showSuccessToast).toHaveBeenCalledWith("Account succesfully created!")
  })

  it("should handle error and display error message", async () => {
    const email = "test@example"
    const password = "password"
    const error = new Error("Failed to create account")

    await createAccount(email, password)

    expect(showErrorToast).toHaveBeenCalledWith("There was a problem creating an account: " + error)
  })
})
