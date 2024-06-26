import React from "react"
import { render, fireEvent, act } from "@testing-library/react-native"
import DescriptionScreen from "../../../../screens/Registration/DescriptionScreen/DescriptionScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
const mockNavigate = jest.fn()
const mockGoBack = jest.fn()

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  }
})

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(() => ({selectedInterests: ["one"], setSelectedInterests: jest.fn(), description: ""})),
}))

describe("DescriptionScreen", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <TouchableWithoutFeedback>
          <DescriptionScreen />
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    )

    expect(getByText("Add your Description")).toBeTruthy()
    expect(getByPlaceholderText("Enter your description here...")).toBeTruthy()
    expect(getByText("Validate")).toBeTruthy()
  })

  it("allows entering text into the TextInput", () => {
    const { getByText, getByPlaceholderText } = render(
      <SafeAreaProvider>
        <TouchableWithoutFeedback>
          <DescriptionScreen />
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    )

    const input = getByPlaceholderText("Enter your description here...")
    act(() => {
      fireEvent.changeText(input, "New description text")
    })

    expect(getByText("Validate")).toBeTruthy()
  })

  it("navigates back on pressing the validate button", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <TouchableWithoutFeedback>
          <DescriptionScreen />
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    )

    const button = getByText("Validate")
    fireEvent.press(button)

    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })

  it("dismisses keyboard", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <TouchableWithoutFeedback>
          <DescriptionScreen />
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    )
    fireEvent.press(getByText("Add your Description"))
  })
})
