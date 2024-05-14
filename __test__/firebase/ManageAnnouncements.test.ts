import { Firestore } from "firebase/firestore"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { createAnnouncement, getAllAnnouncements } from "../../firebase/ManageAnnouncements"
import { waitFor } from "@testing-library/react-native"


jest.mock("../../firebase/firebaseConfig", () => ({
    db: jest.fn(() => ({} as Firestore))
  }))
  
  const mockGetDoc = jest.fn().mockImplementation((uid: string) =>{
    if (uid === "0") {
      return Promise.resolve({ exists: jest.fn(() => false)})
    }
    else if (uid === "1") {
      return Promise.resolve({ exists: jest.fn(() => true)})
    }
    else {
      return Promise.reject()
    }
  })
  
  jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(() => ({} as Firestore)),
    doc: jest.fn(() => ({})),
    getDoc:  mockGetDoc,
    setDoc: jest.fn().mockImplementation((collectionRef, data) => {
      if (data.title === "test Announcement") {
        return Promise.resolve({ id: "123" })
      } else {
        return Promise.reject(new Error("Failed to store announcement data"))
      }
    }),
    collection: jest.fn(() => ({})),
  }))
  

jest.mock("../../components/ToastMessage/toast", () => ({
    showErrorToast: jest.fn(),
    showSuccessToast: jest.fn()
}))

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

describe("manageAnnouncements", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should create an Announcement and display success message", async () => {
        const title = "test Announcement"
        const description = "description"
        const point = { x: 47.238458, y: 5.984155 }
        const location = "location"
        const imageUrl = "imageUrl"
        const interests = ["interest1", "interest2", "interest3"]

        await createAnnouncement(title, location,point, description, interests ,imageUrl)
        expect(showSuccessToast).toHaveBeenCalledWith("Announcement created successfully!")
    })

    it("should handle error and display error message", async () => {
        const title = "test Announcement fail"
        const description = "description"
        const point = { x: 47.238458, y: 5.984155 }
        const location = "location"
        const imageUrl = "imageUrl"
        const interests = ["interest1", "interest2", "interest3"]

        await createAnnouncement(title, location,point, description, interests ,imageUrl)
        expect(showErrorToast).toHaveBeenCalledWith("There was an error storing your announcement data, please try again.")
    })

    it("should fetch all announcements successfully", async () => {
        mockGetDoc.mockImplementation("0")
        const announcements = await getAllAnnouncements()
        waitFor(() => {
            if (announcements) {
                expect(announcements.length).toBe(1)
            }
        })
    })
})

