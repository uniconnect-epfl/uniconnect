import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { ProfileNetwork } from "../../../../screens/Profile/ProfileNetwork/ProfileNetwork"
import { loginEmailPassword } from "../../../../firebase/Login"

jest.mock("d3-force", () => ({
  forceSimulation: jest.fn(() => ({
    force: jest.fn().mockReturnThis(),
    nodes: jest.fn().mockReturnThis(),
    links: jest.fn().mockReturnThis(),
    alpha: jest.fn().mockReturnThis(),
    restart: jest.fn(),
    stop: jest.fn(),
    on: jest.fn().mockReturnThis(),
  })),
  forceLink: jest.fn(() => ({
    id: jest.fn().mockReturnThis(),
    distance: jest.fn().mockReturnThis(),
  })),
  forceManyBody: jest.fn(() => ({
    strength: jest.fn().mockReturnThis(),
  })),
  forceCenter: jest.fn().mockReturnThis(),
  forceCollide: jest.fn().mockReturnThis(),
}))

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" })),
  getAuth: jest.fn(() => ({
    currentUser: { uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" },
  })),
}))

const externalUser = {
  uid: "ydz5dQEJraPR69E9QT22Ny92pw63",
  email: "harrypotter@hp.com",
  firstName: "Harry",
  friends: [
    "LGCQiQFG00Xfi8pVX2wChqdYTEU2",
    "PIKTJTYMvKXqD4ym1IrgaOfd8Q32",
    "Rw0mfdFka5gsA6I9hwLPr58Sa4o1",
    "VrvHkkSrgZgLRzi9Rq8jbe1Zl8m1",
    "afQT4WVJljOAgSUwIpDYTMVwgHI3",
    "ag1uYwNASAVsIlb3s3avBuy7ZKO2",
    "fJBXEJDLJ0XFjbFcsKYNvp9wBPF2",
    "m3iQUQQ8U7MhcQtxecyJfO0H2B83",
    "om1kFa9OdMgECTLndLBbU3BX3Tp2",
    "tTPA1brWxeOEP0TwAg7a7ITdgrL2",
    "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
  ],
  lastName: "Potter",
  date: new Date(2018, 4, 8, 10, 13, 41, 12),
  description:
    "Hi, I'm Harry Potter. I'm known for defeating Voldemort and my adventures at Hogwarts with my best friends.",
  location: "Gryffindor Common Room",
  selectedInterests: [
    "Quidditch",
    "Defeating Voldemort",
    "Dumbledore's Army",
    "Artificial Intelligence",
  ],
  profilePicture: "",
  events: [""],
}
beforeAll(async () => {
  global.alert = jest.fn()
  await loginEmailPassword("gasthoral@gmail.com", "Abcdefg123")
})

describe("ProfileNetwork", () => {
  it("renders correctly", () => {
    const component = render(<ProfileNetwork />)
    expect(component).toBeTruthy()
  })

  it("filters contacts based on search input", async () => {
    const component = render(<ProfileNetwork user={externalUser} />)

    fireEvent.changeText(
      component.getByPlaceholderText("Search..."),
      "Hermione"
    )

    await waitFor(
      () => {
        expect(component.getByText("Hermione Granger")).toBeTruthy()
      },
      { timeout: 5000 }
    )
  }, 10000)
})
