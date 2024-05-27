import { Firestore, doc, getDocs, getDoc, setDoc } from "firebase/firestore"
import { createEvent, getAllFutureEvents, getAllPastEvents, getEventData, updateEventData } from "../../firebase/ManageEvents"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { Point } from "react-native-maps"

jest.mock("../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

const mockGetDoc = jest.fn()
const mockSetDoc = jest.fn()

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore")
  return {
    ...originalModule,
    collection: jest.fn(),
    Timestamp: {
      fromDate: (date: Date) => ({
        toDate: () => date,
      }),
    },
    doc: jest.fn(() => ({})),
    setDoc: jest.fn((...args) => mockSetDoc(...args)),
    getDoc: jest.fn((...args) => mockGetDoc(...args)),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    serverTimestamp: jest.fn(),
  }
})

jest.mock("../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn(),
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

describe("manageEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })



  describe("createEvent", () => {
    it("should create an event and display success message", async () => {
      const title = "test title"
      const description = "description"
      const date = new Date().toISOString()
      const point: Point = { x: 47.238458, y: 5.984155 }
      const location = "location"
      const imageUrl = "imageUrl"
      const host = "123"
      const participants = [host]

      doc.mockReturnValueOnce({ id: "123" })
      await createEvent(title, description, date, point, location, imageUrl, host)

      expect(setDoc).toHaveBeenCalledWith(expect.any(Object), {
        uid: "123",
        title,
        point,
        location,
        date,
        description,
        imageUrl,
        participants,
        host,
      })
      expect(showSuccessToast).toHaveBeenCalledWith("Event created successfully!")
    })

    it("should handle error and display error message", async () => {
      const title = "not test title"
      const description = "description"
      const date = new Date().toISOString()
      const point: Point = { x: 47.238458, y: 5.984155 }
      const location = "location"
      const imageUrl = "imageUrl"
      const userId = "123"

      setDoc.mockRejectedValueOnce(new Error("Failed to store event"))

      await createEvent(title, description, date, point, location, imageUrl, userId)

      expect(showErrorToast).toHaveBeenCalledWith("There was an error storing your event data, please try again.")
    })
  })

  describe("getEventData", () => {
    it("should fetch a single event successfully", async () => {
      const eventUid = "123"
      const date = new Date().toISOString()
      const host = "123"
      const participants = [host]

      const mockEvent = {
        uid: eventUid,
        title: "Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: date,
        imageUrl: "imageUrl",
        participants,
        host,
      }

      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => mockEvent,
      })

      const event = await getEventData(eventUid)

      expect(event).toEqual({
        uid: eventUid,
        title: "Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: date,
        imageUrl: "imageUrl",
        participants,
        host,
      })
    })

    it("should return undefined for non-existing document", async () => {
      const eventUid = "non-existing"
      getDoc.mockResolvedValueOnce({
        exists: () => false,
      })

      const event = await getEventData(eventUid)

      expect(event).toBeUndefined()
    })
  })

  describe("getAllPastEvents", () => {
    it("should fetch past events successfully", async () => {
      const daysAgo = 10
      const date = new Date(new Date().setDate(new Date().getDate() - daysAgo)).toISOString()
      const host = "123"
      const participants = [host]

      const mockPastEvent = {
        uid: "123",
        title: "Past Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: date,
        imageUrl: "imageUrl",
        participants,
        host,
      }

      getDocs.mockResolvedValueOnce({
        docs: [
          {
            data: () => mockPastEvent
          }
        ]
      })

      const events = await getAllPastEvents()

      expect(events).toEqual([{
        uid: "123",
        title: "Past Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: date,
        imageUrl: "imageUrl",
        participants,
        host,
      }])
    })

    it("should handle error and return empty array", async () => {
      getDocs.mockRejectedValueOnce(new Error("Failed to fetch"))

      const events = await getAllPastEvents()

      expect(events).toEqual([])
      expect(showErrorToast).toHaveBeenCalledWith("Error fetching events. Please check your connection and try again.")
    })
  })

  describe("getAllFutureEvents", () => {
    it("should fetch future events successfully", async () => {
      const daysUntil = 10
      const date = new Date(new Date().setDate(new Date().getDate() + daysUntil)).toISOString()
      const host = "123"
      const participants = [host]

      const mockFutureEvent = {
        uid: "123",
        title: "Future Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: date,
        imageUrl: "imageUrl",
        participants,
        host,
      }

      getDocs.mockResolvedValueOnce({
        docs: [
          {
            data: () => mockFutureEvent
          }
        ]
      })

      const events = await getAllFutureEvents()

      expect(events).toEqual([{
        uid: "123",
        title: "Future Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: date,
        imageUrl: "imageUrl",
        participants,
        host,
      }])
    })

    it("should handle error and return empty array", async () => {
      getDocs.mockRejectedValueOnce(new Error("Failed to fetch"))

      const events = await getAllFutureEvents()

      expect(events).toEqual([])
      expect(showErrorToast).toHaveBeenCalledWith("Error fetching events. Please check your connection and try again.")
    })

    it("should handle error and return empty array", async () => {
      getDocs.mockRejectedValueOnce(new Error("Failed to fetch"))

      await getEventData("123")

      expect(showErrorToast).toHaveBeenCalledWith("Error fetching event data. Please check your connection and try again.")
    })
  })

  describe("Update Event data", () => {
    const mockEvent = {
      uid: "eventUid",
      title: "Event",
      location: "location",
      point: { x: 47.238458, y: 5.984155 },
      description: "description",
      date: new Date().toISOString(),
      imageUrl: "imageUrl",
      participants: ["oldUserId"],
      host: "hostId",
      interests: ["interest"],
    }

    it("should update event data successfully", async () => {
        mockGetDoc.mockResolvedValueOnce({
          data: () => mockEvent,
        })
        mockSetDoc.mockResolvedValueOnce(undefined)

      const result = await updateEventData('eventUid', 'newUserId')

      expect(result).toBe(true)

    })

    it("should handle error and return false", async () => {
      mockGetDoc.mockRejectedValueOnce(new Error("Failed to fetch event data"))

      const result = await updateEventData('eventUid', 'newUserId')

      expect(result).toBe(false)
      expect(showErrorToast).toHaveBeenCalledWith("Error fetching event data. Please check your connection and try again.")
    })
  }
  )

})
