import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import InterestsScreen from "../../../../screens/Registration/InterestsScreen/InterestsScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Auth } from "firebase/auth"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  onAuthStateChanged: jest.fn(),
}))

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(() => ({
    selectedInterests: ["one"],
    setSelectedInterests: jest.fn(),
  })),
}))

describe("InterestsScreen", () => {
  it("renders the screen with necessary components", async () => {
    const { getByPlaceholderText, getAllByText } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      expect(getByPlaceholderText("Search")).toBeTruthy()
      const interestButtons = getAllByText(/.+/)
      expect(interestButtons.length).toBeGreaterThan(0)
    })
  })

  it("allows searching and filters interests", async () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search")
      fireEvent.changeText(searchInput, "Machine Learning")
      expect(getByText("Machine Learning")).toBeTruthy()
    })
  })

  it("allows selecting and deselecting interests", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const interestButton = getByTestId("CryptocurrencyID")
      fireEvent.press(interestButton)
      fireEvent.press(interestButton)
    })
  })

  it("creates a label when an interest is selected", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByTestId("Artificial InteligenceID"))
      expect(getByTestId("Artificial Inteligence" + "IDlabel")).toBeTruthy()
    })
  })

  it("removes a label when clicked", async () => {
    const { getByTestId, queryByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByTestId("Artificial Inteligence" + "ID"))
      fireEvent.press(getByTestId("Artificial Inteligence" + "ID"))
      expect(queryByTestId("Artificial Inteligence" + "IDlabel")).toBeNull()
    })
  })
})