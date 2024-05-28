import React from "react"
import { render, waitFor } from "@testing-library/react-native"
import App from "../../App"
import { Auth } from "firebase/auth"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
}))

jest.mock("expo-linking", () => ({
  createURL: jest.fn().mockImplementation((path) => `uniconnect://${path}`),
}))

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

describe("App", () => {
  it("renders correctly", async () => {
    await waitFor(async () => {
      const component = render(<App />)
      expect(component).toBeTruthy()
    })
  })
})
