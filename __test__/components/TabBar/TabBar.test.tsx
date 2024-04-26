import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
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
        expect(getByText("Show on the Map")).toBeTruthy()
      })
    })

    await act(async () => {
      fireEvent.press(connections)
      await waitFor(() => {
        expect(getByText("Connections")).toBeTruthy()
      })
    })

    await act(async () => {
      fireEvent.press(explore)
      await waitFor(() => {
        expect(getByText("Plain View")).toBeTruthy()
      })
    })
  })
})
