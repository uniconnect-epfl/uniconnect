import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { SettingsScreen } from "../../../screens/Settings/SettingsScreen"
import { NavigationContainer } from "@react-navigation/native"
import { Alert } from 'react-native'


const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

describe("SettingsScreen", () => {
  test("renders correctly", () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    )

    // Assert that the back button is rendered
    const backButton = getByTestId("back-button")
    expect(backButton).toBeTruthy()

    // Assert that the menu items are rendered
    const menuItemTexts = [
      "ACCOUNT CENTER",
      "LANGUAGE",
      "NOTIFICATIONS",
      "HELP",
      "ABOUT",
      "LOG OUT",
    ]
    menuItemTexts.forEach((text) => {
      const menuItem = getByText(text)
      expect(menuItem).toBeTruthy()
    })
  })

  test("navigates back when back button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    )

    const backButton = getByTestId("back-button")
    fireEvent.press(backButton)

    expect(mockGoBack).toHaveBeenCalled()
  })
  test("calls the correct action when a menu item is pressed", () => {
    const alertSpy = jest.spyOn(Alert, "alert")
    const { getByText } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    )

    const menuItem = getByText("ACCOUNT CENTER")
    fireEvent.press(menuItem)

    expect(alertSpy).toHaveBeenCalledWith("Coming soon")
  })
})
