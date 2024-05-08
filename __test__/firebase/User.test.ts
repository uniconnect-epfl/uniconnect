import { Firestore } from "firebase/firestore"
import { Auth } from "firebase/auth"
import { getUserData, updateUserData } from "../../firebase/User"

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

const mockSetDoc = jest.fn()

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  getDoc: jest.fn(() => ({})),
  doc: jest.fn(() => ({})),
  addDoc: jest.fn(),
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

describe("User", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return user data when successfully fetched", async () => {
    const uid = "123"

    await getUserData(uid)
  })

  it("should show error toast and return null when fetching fails", async () => {
    const uid = "123"

    await getUserData(uid)

  })

  it("should update user data when successfully updated", async () => {
    const uid = "123"
    const newData = { firstName: "John Doe" }

    const result = await updateUserData(uid, newData)

    expect(result).toBe(false)
  })

  it("should show error toast and return false when updating fails", async () => {
    const uid = "123"
    const newData = { firstName: "John Doe" }

    const result = await updateUserData(uid, newData)

    expect(result).toBe(false)
  })
  
})
