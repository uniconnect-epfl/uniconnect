import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"
import { Firestore } from "firebase/firestore"

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

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("../../../firebase/User", () => ({
  getUserData: jest.fn(() => ({
    firstName: "John",
    lastName: "Doe",
    location: "London",
  })),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

const mockNavigate = jest.fn()

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

describe("TabBar", () => {
  it("renders the TabBar correctly", () => {
    const component = render(
      <NavigationContainer>
        <HomeTabNavigator />
      </NavigationContainer>
    )

    expect(component).toBeTruthy()
  })

  it("navigates to the selected tab on press", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeTabNavigator />
      </NavigationContainer>
    )

    const network = getByText("Network")
    const add = getByText("Add")
    const explore = getByText("Explore")

    await act(async () => {
      fireEvent.press(explore)
      await waitFor(() => {
        expect(getByText("Map View")).toBeTruthy()
      })
    })

    await act(async () => {
      fireEvent.press(add)
      await waitFor(() => {
        expect(getByText("Add")).toBeTruthy()
      })
    })

    await act(async () => {
      fireEvent.press(network)
      await waitFor(() => {
        expect(getByText("Graph")).toBeTruthy()
      })
    })
  })
})
