import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { SettingsScreen } from "../../../screens/Settings/SettingsScreen"
import { NavigationContainer } from "@react-navigation/native"

import { Auth } from "firebase/auth"
import { SafeAreaProvider } from "react-native-safe-area-context"

const mockGoBack = jest.fn()

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

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
      navigate: jest.fn(),
    }),
  }
})

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({ signOut: jest.fn() })),
}))

jest.mock("../../../firebase/firebaseConfig", () => ({
  auth: { signOut: jest.fn(() => Promise.resolve()) },
}))

describe("SettingsScreen", () => {
  test("renders correctly", () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <SettingsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    // Assert that the back button is rendered
    const backButton = getByTestId("back-arrow")
    expect(backButton).toBeTruthy()

    // Assert that the menu items are rendered
    const menuItemTexts = [
     
      
      
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
        <SafeAreaProvider>
          <SettingsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    const backButton = getByTestId("back-arrow")
    fireEvent.press(backButton)

    expect(mockGoBack).toHaveBeenCalled()
  })
  test("calls the correct action when a menu item is pressed", () => {
    
    const { getByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <SettingsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    const menuItem = getByText("ABOUT")
    fireEvent.press(menuItem)

  })

  test("calls the correct action when the logout menu item is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <SettingsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    const menuItem = getByText("LOG OUT")
    fireEvent.press(menuItem)
  })
})
