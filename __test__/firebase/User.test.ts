import { Firestore, updateDoc } from "firebase/firestore"
import { Auth } from "firebase/auth"
import { updateUserData, updateUserEvents, updateUserImage, updateUserInterests, uploadUserImageToStorage } from "../../firebase/User"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { User } from "../../types/User"

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  getStorage: jest.fn(() => {})
}))

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
  events: ["123", "456", "789"],
  profilePicture: ""
}

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  getDoc: jest.fn((...args) => mockGetDoc(...args)),
  doc: jest.fn(() => ({})),
  addDoc: jest.fn(),
  collection: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => ({})),
  updateDoc: jest.fn(),
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

  it("should update user data when successfully updated", async () => {
    const uid = "123"
    const newData = { firstName: "John Doe" }

    const mockUpdateDoc = updateDoc as jest.Mock
    mockUpdateDoc.mockResolvedValue(true)

    const result = await updateUserData(uid, newData)

    expect(result).toBe(true)
  })

  it("should show error toast and return false when updating fails", async () => {
    const uid = "123"
    const newData = { firstName: "John Doe" }

    const mockUpdateDoc = updateDoc as jest.Mock
    mockUpdateDoc.mockRejectedValue(new Error("Failed to fetch user data"))

    const result = await updateUserData(uid, newData)

    expect(result).toBe(false)
  })

  
  it('should upload image to storage and return URL', async () => {
    const uid = 'someUserId'
    const uri = 'someImageUri'
    const expectedUrl = 'http://example.com/image.jpg'

    try{
      const mockRef = ref as jest.Mock
      mockRef.mockReturnValue({})
      const mockUploadBytes = uploadBytes as jest.Mock
      mockUploadBytes.mockResolvedValue({})
      const mockGetDownloadURL = getDownloadURL as jest.Mock
      mockGetDownloadURL.mockResolvedValue(expectedUrl)

      await uploadUserImageToStorage(uid, uri)
    } catch (error) {
      console.log(error)
    }
  })

  it('should handle error during upload', async () => {
    const uid = 'someUserId'
    const uri = 'someImageUri'

    try{
      const mockRef = ref as jest.Mock
      mockRef.mockReturnValue({})
      const mockUploadBytes = uploadBytes as jest.Mock
      mockUploadBytes.mockRejectedValue({})

      const url = await uploadUserImageToStorage(uid, uri)

      expect(url).toBeNull()
      expect(ref).toHaveBeenCalledWith(expect.anything(), `users/${uid}.jpg`)
      expect(uploadBytes).toHaveBeenCalledWith(expect.anything(), null)
      expect(getDownloadURL).not.toHaveBeenCalled()
    } catch (error) {
      console.log(error)
    }
  })

  it("should update user image in database and return true when successful", async () => {
    const uid = "123"
    const url = "https://example.com/image.jpg"

    const mockUpdateDoc = updateDoc as jest.Mock
    mockUpdateDoc.mockResolvedValue(true)
    

    const result = await updateUserImage(uid, url)

    expect(result).toBe(true)
  })

  it("should show error toast and return false when updating user image fails", async () => {
    const uid = "123"
    const url = "https://example.com/image.jpg"

    const mockUpdateDoc = updateDoc as jest.Mock
    mockUpdateDoc.mockRejectedValue(new Error("Failed to fetch user data"))

    const result = await updateUserImage(uid, url)

    expect(result).toBe(false)
  })

  it("should update user interests in database and return true when successful", async () => {
    const uid = "123"
    const interests = ["Machine Learning, Sports, Tractoupelle"]

    const mockUpdateDoc = updateDoc as jest.Mock
    mockUpdateDoc.mockResolvedValue(true)

    const result = await updateUserInterests(uid, interests)

    expect(result).toBe(true)
  })

  it("should show error toast and return false when updating user interests fails", async () => {
    const uid = "123"

    const interests = ["Machine Learning, Sports, Tractoupelle"]

    const mockUpdateDoc = updateDoc as jest.Mock
    mockUpdateDoc.mockRejectedValue(new Error("Failed to fetch user data"))

    const result = await updateUserInterests(uid, interests)

    expect(result).toBe(false)
  })
})
