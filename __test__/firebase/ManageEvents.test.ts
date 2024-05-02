import { Firestore } from "firebase/firestore"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { createEvent } from "../../firebase/ManageEvents"


jest.mock("../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))


jest.mock("firebase/firestore", () => {
    const originalModule = jest.requireActual("firebase/firestore")
  
    // function mockQuery() {}

    // function mockWhere(field: any, op: any, value: any) {
    //     return { field, op, value }  // return mock query object
    // }

    // function mockOrderBy(field: any, direction: any) {
    //     return { field, direction }  // enhance mock query object
    // }
    
    // function mockGetDocs(query) {
    //     const now = new Date()
    //     const dateToCompare = query.value.toDate()

    //     if (query.op === '>' && dateToCompare > now) {
    //         // Future events
    //         return Promise.resolve({
    //             docs: [{ data: () => ({ title: "Future Event", date: new Date(2025, 1, 1) }) }]
    //         })
    //     } else if (query.op === '<' && dateToCompare <= now) {
    //         // Past events
    //         return Promise.resolve({
    //             docs: [{ data: () => ({ title: "Past Event", date: new Date(2020, 1, 1) }) }]
    //         })
    //     }

    //     return Promise.resolve({ docs: [] })  // No matching events
    // }


    return {
      ...originalModule,
      query: jest.fn(),
      where: jest.fn((field, op, value) => ({ field, op, value })), // Capture where conditions
      orderBy: jest.fn((field, direction) => ({ field, direction })), // Capture orderBy conditions
      getDocs: jest.fn().mockImplementation((query) => {
        const now = new Date()
        const valueDate = query.value.toDate()

        if (query.op === '>' && valueDate > now) {
          return Promise.resolve({
            docs: [{ id: "1", data: () => ({ title: "Future Event", date: new Date(2025, 1, 1) }) }]
          })
        } else if (query.op === '<' && valueDate <= now) {
          return Promise.resolve({
            docs: [{ id: "2", data: () => ({ title: "Past Event", date: new Date(2020, 1, 1) }) }]
          })
        }
        return Promise.resolve({ docs: [] })
      }),
      collection: jest.fn(() => ({})),
      Timestamp: {
        fromDate: (date: Date) => ({
          toDate: () => date,
        }),
      },
      getFirestore: jest.fn(() => ({} as Firestore)),
      doc: jest.fn(() => ({})),
      setDoc: jest.fn().mockImplementation((collectionRef, data) => {
        if (data.title === "test title") {
          return Promise.resolve({ id: "123" })
        } else {
          return Promise.reject(new Error("Failed to store event"))
        }
      }),
      serverTimestamp: jest.fn(() => ({})),
    }
  })

jest.mock("../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
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

  it("should create an event and display success message", async () => {
    const title = "test title"
    const description = "description"
    const date = new Date()
    const point = { x: 47.238458, y: 5.984155 }
    const location = "location"
    const imageUrl = "imageUrl"
    const uid = "123"

    await createEvent(uid, title, description, date, point, location, imageUrl)
    expect(showSuccessToast).toHaveBeenCalledWith("Event created successfully!")
  })

  it("should handle error and display error message", async () => {
    const title = "not test title"
    const description = "description"
    const date = new Date()
    const point = { x: 47.238458, y: 5.984155 }
    const location = "location"
    const imageUrl = "imageUrl"
    const uid = "123"

    await createEvent(uid, title, description, date, point, location, imageUrl)
    expect(showErrorToast).toHaveBeenCalledWith("There was an error storing your event data, please try again.")
  })


//   it("should fetch past events successfully", async () => {
//     const events = await getAllPastEvents()
//     expect(events.length).toBe(1)
//     expect(events[0].title).toEqual("Past Event")
//   })

//   it("should fetch future events successfully", async () => {
//     const events = await getAllFutureEvents()
//     expect(events.length).toBe(1)
//     expect(events[0].title).toEqual("Future Event")
//   })

})