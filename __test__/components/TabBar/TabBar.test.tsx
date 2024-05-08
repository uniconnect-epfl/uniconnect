import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"
import { Firestore } from "firebase/firestore"

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

    const home = getByText("Home")
    const connections = getByText("Connections")
    const explore = getByText("Explore")

    await act(async () => {
      fireEvent.press(home)
      await waitFor(() => {
        expect(getByText("Map View")).toBeTruthy()
      })
    })

    await act(async () => {
      fireEvent.press(connections)
      await waitFor(() => {
        expect(getByText("Connections")).toBeTruthy()
      })
    })

    await act(async () => {
      act(() => {
        fireEvent.press(explore)
      })
      await waitFor(() => {
        expect(getByText("Graph")).toBeTruthy()
      })
    })
  })
})
