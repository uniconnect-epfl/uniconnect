import { Firestore, getDoc } from "firebase/firestore"
import { createAccount, isNewUser, storeInitialUserData } from "../../firebase/Registration"
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

jest.mock("../../firebase/firebaseConfig", () => ({
  auth: jest.fn(() => ({} as Auth)),
  db: jest.fn(() => ({} as Firestore))
}))

const mockSetDoc = jest.fn()

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  doc: jest.fn(() => ({})),
  getDoc: jest.fn((uid) => {
    if (uid === "123") {
      return Promise.resolve({ exists: jest.fn(() => false)})
    }
    else if (uid === "456") {
      return Promise.resolve({ exists: jest.fn(() => true)})
    }
    else {
      return Promise.reject()
    }
  }),
  addDoc: jest.fn().mockImplementation((collectionRef, data) => {
    if (data.email === "test@example.com") {
      return Promise.resolve({ id: "123" })
    } else {
      return Promise.reject(new Error("Failed to store email"))
    }
  }),
  collection: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => ({})),
  setDoc: mockSetDoc
}))

jest.mock("../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

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

  it("should return false if user exists", async () => {
    const uid = "456"
    const mockGetDoc = getDoc as jest.Mock
    mockGetDoc.mockResolvedValue({ exists: jest.fn(() => true)})

    const result = await isNewUser(uid)

    expect(result).toBe(false)
  })

  it("should return true if user is new", async () => {
    const uid = "123"
    const mockGetDoc = getDoc as jest.Mock
    mockGetDoc.mockResolvedValue({ exists: jest.fn(() => false)})

    const result = await isNewUser(uid)

    expect(result).toBe(true)
  })

  it("should return false if an error occurs", async () => {
    const uid = "789"
    const mockGetDoc = getDoc as jest.Mock
    mockGetDoc.mockRejectedValue(new Error("whatever"))

    const result = await isNewUser(uid)

    expect(result).toBe(false)
  })

  it("should store initial user data", async () => {
    const uid = "123"
    const email = "test@example.com"
    const firstName = "John"
    const lastName = "Doe"
    const date = new Date()
    const location = "New York"
    const description = "Lorem ipsum"
    const selectedInterests = ["programming", "music"]

    await storeInitialUserData(uid, email, firstName, lastName, date, location, description, selectedInterests)
  })
})
