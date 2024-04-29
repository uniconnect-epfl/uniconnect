import React from "react"
import { render } from "@testing-library/react-native"
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"
import { NavigationContainer } from "@react-navigation/native"

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

describe("HomeTabNavigator", () => {
  it("renders the bottom tab navigator with expected initial route", () => {
    const component = render(
      <NavigationContainer>
        <HomeTabNavigator />
      </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })
})
