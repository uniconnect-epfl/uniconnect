import { Firestore } from "firebase/firestore"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { createEvent, getAllFutureEvents, getAllPastEvents } from "../../firebase/ManageEvents"


jest.mock("../../firebase/firebaseConfig", () => ({
    db: jest.fn(() => ({} as Firestore))
}))


jest.mock("firebase/firestore", () => {
    const originalModule = jest.requireActual("firebase/firestore")

    return {
        ...originalModule,
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

    it("should fetch past events successfully", async () => {
        const events = await getAllPastEvents()
        expect(events.length).toBe(0)
    })

    it("should fetch future events successfully", async () => {
        const events = await getAllFutureEvents()
        expect(events.length).toBe(0)
    })
})


// import { Firestore } from "firebase/firestore"
// import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
// import { createEvent, getAllFutureEvents, getAllPastEvents } from "../../firebase/ManageEvents"
// import { mockFirebase } from "firestore-jest-mock"
// import { mockWhere, mockOrderBy, mockGet, mockSet, mockCollection } from "firestore-jest-mock/mocks/firestore"
// import { Auth } from "firebase/auth"


// jest.mock("firebase/auth", () => ({
//     getAuth: jest.fn(() => ({} as Auth)),
//     createUserWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
//         if (email === "test@example.com" && password === "password") {
//             return Promise.resolve(void 0)
//         } else {
//             return Promise.reject(new Error("Failed to create account"))
//         }
//     }),
//     getReactNativePersistence: jest.fn(() => ({} as Auth)),
//     initializeAuth: jest.fn(() => ({} as Auth)),
// }))


// jest.mock("../../firebase/firebaseConfig", () => ({
//     auth: jest.fn(() => ({} as Auth)),
// }))

// jest.mock("../../components/ToastMessage/toast", () => ({
//     showErrorToast: jest.fn(),
//     showSuccessToast: jest.fn()
// }))

// jest.mock('@react-native-async-storage/async-storage', () =>
//     require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// )

// jest.mock('firebase/firestore', () => {
//     return {
//         firestore: jest.fn(() => mockFirebase({
//             database: {
//                 events: [
//                     { id: '1', date: new Date(2020, 1, 1), title: 'Past Event' },
//                     { id: '2', date: new Date(2025, 1, 1), title: 'Future Event' }
//                 ],
//             }
//         })),
//     };
// });

// describe("manageEvents", () => {

//     beforeEach(() => {
//         jest.clearAllMocks()
//     })

//     it("should create an event and display success message", async () => {
//         const title = "test title"
//         const description = "description"
//         const date = new Date()
//         const point = { x: 47.238458, y: 5.984155 }
//         const location = "location"
//         const imageUrl = "imageUrl"
//         const uid = "123"

//         await createEvent(uid, title, description, date, point, location, imageUrl)
//         expect(showSuccessToast).toHaveBeenCalledWith("Event created successfully!")
//     })

//     it("should handle error and display error message", async () => {
//         const title = "not test title"
//         const description = "description"
//         const date = new Date()
//         const point = { x: 47.238458, y: 5.984155 }
//         const location = "location"
//         const imageUrl = "imageUrl"
//         const uid = "123"

//         await createEvent(uid, title, description, date, point, location, imageUrl)
//         expect(showErrorToast).toHaveBeenCalledWith("There was an error storing your event data, please try again.")
//     })


//     it("should fetch past events successfully", async () => {
//         const events = await getAllPastEvents();

//         expect(mockCollection).toHaveBeenCalledWith("events");
//         expect(mockWhere).toHaveBeenCalledWith("date", "<", new Date());
//         expect(events.length).toBe(1);
//         expect(events[0].title).toEqual("Past Event");
//     })

//     it("should fetch future events successfully", async () => {
//         const events = await getAllFutureEvents();

//         expect(mockCollection).toHaveBeenCalledWith("events");
//         expect(mockWhere).toHaveBeenCalledWith("date", ">", new Date());
//         expect(events.length).toBe(1);
//         expect(events[0].title).toEqual("Future Event");
//     })

// })


//##########################################################
//##########################################################


// import { mockFirebase } from 'firestore-jest-mock';
// import { Timestamp } from 'firestore-jest-mock/mocks/timestamp';
// import { mockGet, mockSettings } from 'firestore-jest-mock/mocks/firestore';

// // Define the structure for the library mock configuration


//   describe('Firebase Firestore Tests', () => {
//     // Mock the specific firestore implementation
//     mockFirebase({
//       database: {
//         events: [
//           { id: '1', date: new Date(2020, 1, 1), title: 'Past Event', point: { x: 47.238458, y: 5.984155 }, location: "location", imageUrl: "imageUrl" },
//           { id: '2', date: new Date(2025, 1, 1), title: 'Future Event', point: { x: 47.238458, y: 5.984155 }, location: "location", imageUrl: "imageUrl" }
//         ],
//       }
//     });

//     let Firestore: any;  // Use 'any' or a specific Firestore type if available

//     beforeEach(() => {
//         jest.clearAllMocks()
//     })

//     afterEach(() => {
//         jest.clearAllMocks();
//       });
//       test('We can start an application', async () => {
//         const firestore = new Firestore();
//         firestore.settings({ ignoreUndefinedProperties: true });
//         expect(mockSettings).toHaveBeenCalledWith({ ignoreUndefinedProperties: true });
//       });

// });


//##########################################################
//##########################################################


// require('firestore-jest-mock/mocks/firebase');
// require('firestore-jest-mock/mocks/firestore');
// require('firestore-jest-mock/mocks/timestamp');
// const { firestore } = require('firebase/firestore');
// const { mockCollection, mockGet, mockSet } = require('firestore-jest-mock/mocks/firestore');
// import { showSuccessToast, showErrorToast } from "../../components/ToastMessage/toast";
// import { Auth } from "firebase/auth";

// // Mock your Firebase instance
// const { mockFirebase } = require('firestore-jest-mock');

// jest.mock("firebase/auth", () => ({
//     getAuth: jest.fn(() => ({} as Auth)),
//     createUserWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
//         if (email === "test@example.com" && password === "password") {
//             return Promise.resolve(void 0)
//         } else {
//             return Promise.reject(new Error("Failed to create account"))
//         }
//     }),
//     getReactNativePersistence: jest.fn(() => ({} as Auth)),
//     initializeAuth: jest.fn(() => ({} as Auth)),
// }))

// jest.mock("../../firebase/firebaseConfig", () => ({
//     auth: jest.fn(() => ({} as Auth)),
// }))


// mockFirebase({
//     database: {
//         events: [
//             // Add your mock data here
//             { id: '1', data: { uid: 'user1', title: 'Event Title', description: 'Description', date: new Date(), imageUrl: 'url', location: 'Location', point: { latitude: 0, longitude: 0 } } },
//         ],
//     },
// });

// jest.mock('@react-native-async-storage/async-storage', () =>
//     require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// )
// const db = mockFirebase();
// global.db = db;

// const { createEvent, getAllFutureEvents } = require('../../firebase/ManageEvents');


// describe('createEvent', () => {

//     beforeEach(() => {
//         console.log("DATABASE", db);
//         jest.clearAllMocks()
//     })
//     it('successfully creates an event', async () => {
//         console.log("DATABASE", db);
//         const title = "test title"
//         const description = "description"
//         const date = new Date()
//         const point = { x: 47.238458, y: 5.984155 }
//         const location = "location"
//         const imageUrl = "imageUrl"
//         const uid = "123"

//         await createEvent(uid, title, description, date, point, location, imageUrl)
//         expect(mockCollection).toHaveBeenCalledWith("events");
//         expect(mockSet).toHaveBeenCalled();
//         expect(showSuccessToast).toHaveBeenCalledWith("Event created successfully!")
//     });

// });

// describe('getAllFutureEvents', () => {
//     it('fetches all future events', async () => {
//         console.log("DATABASE",db);
//         const events = await getAllFutureEvents();
//         expect(events).toHaveLength(1);
//         expect(events[0].title).toBe('Test Event');
//     });
// });