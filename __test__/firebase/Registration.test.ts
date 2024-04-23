import { Firestore } from "firebase/firestore"
import { createAccount, storeEmail } from "../../firebase/Registration"
import { Auth } from "firebase/auth"

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({} as Auth)),
  createUserWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
    if (email === "test@example.com" && password === "password") {
      return Promise.resolve(void 0)
    } else {
      return Promise.reject(new Error("Failed to create account"))
    }
  })
}))

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  addDoc: jest.fn().mockImplementation((collectionRef, data) => {
    if (data.email === "test@example.com") {
      return Promise.resolve({ id: "123" })
    } else {
      return Promise.reject(new Error("Failed to store email"))
    }
  }),
  collection: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => ({}))
}))

global.alert = jest.fn()

describe("createAccount", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create an account and display success message", async () => {
    const email = "test@example.com"
    const password = "password"

    await createAccount(email, password)

    expect(global.alert).toHaveBeenCalledWith("Account created. Check email")
  })

  it("should handle error and display error message", async () => {
    const email = "test@example"
    const password = "password"
    const error = new Error("Failed to create account")

    await createAccount(email, password)

    expect(global.alert).toHaveBeenCalledWith("There was an error" + error)
  })
})

describe("storeEmail", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should store an email and log success message", async () => {
    const email = "test@example.com"
    const docRef = { id: "123" }

    await storeEmail(email)

    expect(global.alert).toHaveBeenCalledWith("Document written with ID: " + docRef.id)
  })

  it("should handle error and display error message", async () => {
    const email = "test@example"
    const error = new Error("Failed to store email")

    await storeEmail(email)

    expect(global.alert).toHaveBeenCalledWith("Failed to store email: " + error)
  })
})
