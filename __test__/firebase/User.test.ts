import { Firestore } from "firebase/firestore"
import { updateUserEvents } from "../../firebase/User"
import { User } from "../../types/User"
import { Auth } from "firebase/auth"

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
const mockGetDoc = jest.fn()

const mockUser: User = {
  uid: "123",
  email: "test@example.com",
  firstName: "John",
  friends: [],
  lastName: "Doe",
  date: new Date(),
  description: "Test user",
  location: "Test location",
  selectedInterests: [],
  events: ["123", "456", "789"]
}

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  getDoc: jest.fn((...args) => mockGetDoc(...args)),
  doc: jest.fn(() => ({})),
  setDoc: jest.fn((...args) => mockSetDoc(...args))
}))

jest.mock("../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

describe("updateUserEvents", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should update user events successfully", async () => {
    mockGetDoc.mockResolvedValueOnce({
      data: () => mockUser
    })

    const uid = "123"
    const eventId = "999"
    const result = await updateUserEvents(uid, eventId)

    expect(result).toBe(true)
    expect(mockSetDoc).toHaveBeenCalledWith(expect.any(Object), {
      events: ["123", "456", "789", eventId]
    }, { merge: true })
  })

  it("should not update user events if already registered", async () => {
    mockGetDoc.mockResolvedValueOnce({
      data: () => mockUser
    })

    const uid = "123"
    const eventId = "456" // Already in the events list
    const result = await updateUserEvents(uid, eventId)

    expect(result).toBe(false)
    expect(mockSetDoc).not.toHaveBeenCalled()
  })

  it("should handle errors gracefully", async () => {
    mockGetDoc.mockRejectedValueOnce(new Error("Firestore error"))

    const uid = "123"
    const eventId = "999"
    const result = await updateUserEvents(uid, eventId)

    expect(result).toBe(false)
    expect(mockSetDoc).not.toHaveBeenCalled()
  })
})
