import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { Header } from "../../../components/Header/Header"
import { SafeAreaProvider } from "react-native-safe-area-context"

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

describe("Header", () => {
  it("should navigate to Profile screen when profile button is pressed", () => {
    const { getByTestId } = render(
    <SafeAreaProvider>
      <Header />
    </SafeAreaProvider>
    )
    const profileButton = getByTestId("profile-button")

    fireEvent.press(profileButton)

    expect(mockNavigate).toHaveBeenCalledWith("Profile")
  })

  it("should navigate to Settings screen when settings button is pressed", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Header />
      </SafeAreaProvider>
    )
    const settingsButton = getByTestId("settings-button")

    fireEvent.press(settingsButton)

    expect(mockNavigate).toHaveBeenCalledWith("Settings")
  })
})
