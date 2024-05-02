import React from "react"
import { render } from "@testing-library/react-native"
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { Firestore } from "firebase/firestore"

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
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
