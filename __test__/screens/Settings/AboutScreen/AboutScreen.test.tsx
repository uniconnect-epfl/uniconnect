import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { AboutScreen } from "../../../../screens/Settings//AboutScreen//AboutScreen" // Adjust the import path as necessary
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
// Mock the navigation
const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

// Mock the safe area context
jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 10, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

describe("AboutScreen", () => {
  test("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <AboutScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    // Assert that the About us text is rendered
    expect(getByText("About us")).toBeTruthy()

    // Assert that the BackArrow is rendered
    expect(getByTestId("back-arrow")).toBeTruthy()

    // Assert that the Uniconnect description is rendered
    expect(
      getByText(
        /Uniconnect is a social app that facilitates peer-to-peer connections/i
      )
    ).toBeTruthy()

    // Assert that the Developers text is rendered
    expect(getByText("Developers")).toBeTruthy()

    // Assert that each developer's name is rendered
    const developers = [
      "Aidas Venckunas",
      "Alberto Centonze",
      "Gäel Conde",
      "Alexandre Mourot",
      "Gustave Charles",
      "Gaspard Thoral",
      "Pedro Laginhas",
    ]

    developers.forEach((developer) => {
      expect(getByText(developer)).toBeTruthy()
    })
  })

  test("navigates back when back button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <AboutScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    const backButton = getByTestId("back-arrow")
    fireEvent.press(backButton)

    expect(mockGoBack).toHaveBeenCalled()
  })
})
