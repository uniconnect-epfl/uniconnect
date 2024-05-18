import { Firestore, doc, getDocs, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { createEvent, getAllFutureEvents, getAllPastEvents, getEventData } from "../../firebase/ManageEvents"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { Point } from "react-native-maps"

jest.mock("../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

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
    doc: jest.fn(),
    setDoc: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
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
      await createEvent(title, description, date, point, location, imageUrl,host )

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
      const mockPastEvent = {
        uid: "123",
        title: "Past Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: Timestamp.fromDate(new Date(Date.now() - 1000)),
        imageUrl: "imageUrl",
      }

      getDocs.mockResolvedValueOnce({
        forEach: (callback: (doc) => void) => callback({
          data: () => mockPastEvent,
        }),
      })

      const events = await getAllPastEvents()

      expect(events).toEqual([{
        uid: "123",
        title: "Past Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: expect.any(Date),
        imageUrl: "imageUrl",
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
      const mockFutureEvent = {
        uid: "123",
        title: "Future Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: Timestamp.fromDate(new Date(Date.now() + 1000)),
        imageUrl: "imageUrl",
      }

      getDocs.mockResolvedValueOnce({
        forEach: (callback: (doc) => void) => callback({
          data: () => mockFutureEvent,
        }),
      })

      const events = await getAllFutureEvents()

      expect(events).toEqual([{
        uid: "123",
        title: "Future Event",
        location: "location",
        point: { x: 47.238458, y: 5.984155 },
        description: "description",
        date: expect.any(Date),
        imageUrl: "imageUrl",
      }])
    })

    it("should handle error and return empty array", async () => {
      getDocs.mockRejectedValueOnce(new Error("Failed to fetch"))

      const events = await getAllFutureEvents()

      expect(events).toEqual([])
      expect(showErrorToast).toHaveBeenCalledWith("Error fetching events. Please check your connection and try again.")
    })
  })
})
