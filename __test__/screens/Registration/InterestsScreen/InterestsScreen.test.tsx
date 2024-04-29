import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import InterestsScreen from "../../../../screens/Registration/InterestsScreen/InterestsScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

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
  useContext: jest.fn(() => ({selectedInterests: ["one"], setSelectedInterests: jest.fn()})),
}))

describe("InterestsScreen", () => {
  it("renders the screen with necessary components", () => {
    const { getByPlaceholderText, getAllByText } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    expect(getByPlaceholderText("Search")).toBeTruthy()

    const interestButtons = getAllByText(/.+/)
    expect(interestButtons.length).toBeGreaterThan(0)
  })

  it("allows searching and filters interests", () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    const searchInput = getByPlaceholderText("Search")
    fireEvent.changeText(searchInput, "Machine Learning")

    expect(getByText("Machine Learning")).toBeTruthy()
  })

  it("allows selecting and deselecting interests", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    const interestButton = getByText("Machine Learning")
    fireEvent.press(interestButton)
    fireEvent.press(interestButton)
  })
  it("creates a label when an interest is selected", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    fireEvent.press(getByTestId("interestButton-Machine Learning"))
    expect(getByTestId("label-Machine Learning")).toBeTruthy()
  })

  it("removes a label when clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    fireEvent.press(getByTestId("interestButton-Machine Learning"))
    fireEvent.press(getByTestId("label-Machine Learning"))
    expect(queryByTestId("label-Machine Learning")).toBeNull()
  })
})
