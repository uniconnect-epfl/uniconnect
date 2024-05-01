// Interests.test.ts
import { fetchInterests } from "../../firebase/Interests"
import { db } from "../../firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { Auth } from "firebase/auth"

// Mock firestore
jest.mock("firebase/firestore")

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  onAuthStateChanged: jest.fn(),
}))

describe("fetchInterests", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks()
  })

  it("fetches interests successfully from Firestore", async () => {
    const mockInterests = [
      { id: "1", title: "Machine Learning", imageUrl: "url1", category: "AI" },
      { id: "2", title: "Data Science", category: "Data" },
    ]

    const mockGetDocs = getDocs as jest.Mock

    // Setup mock return value for getDocs
    mockGetDocs.mockResolvedValue({
      docs: mockInterests.map((interest) => ({
        id: interest.id,
        data: () => ({
          title: interest.title,
          imageUrl: interest.imageUrl,
          category: interest.category,
        }),
      })),
    })

    const interests = await fetchInterests()

    expect(interests).toEqual(mockInterests)
    expect(getDocs).toHaveBeenCalledWith(collection(db, "interests"))
  })

  it("throws an error when Firestore read fails", async () => {
    const errorMessage = "Unable to fetch interests"
    const mockGetDocs = getDocs as jest.Mock

    mockGetDocs.mockRejectedValue(new Error(errorMessage))

    await expect(fetchInterests()).rejects.toThrow(errorMessage)
  })
})
