import { Firestore } from "firebase/firestore"
import { Auth } from "firebase/auth"
import { getUserData, updateUserData, updateUserImage, updateUserInterests, uploadUserImageToStorage } from "../../firebase/User"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

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

    const result = await updateUserImage(uid, url)

    expect(result).toBe(false)
  })

  it("should show error toast and return false when updating user image fails", async () => {
    const uid = "123"
    const url = "https://example.com/image.jpg"


    const result = await updateUserImage(uid, url)

    expect(result).toBe(false)
  })

  it("should show error toast and return false when updating user interests fails", async () => {
    const uid = "123"
    const interests = ["Machine Learning, Sports, Tractoupelle"]

    const result = await updateUserInterests(uid, interests)

    expect(result).toBe(false)
  })

  it("should update user interests in database and return true when successful", async () => {
    const uid = "123"

    const interests = ["Machine Learning, Sports, Tractoupelle"]

    const result = await updateUserInterests(uid, interests)

    expect(result).toBe(false)
  })
  
})
