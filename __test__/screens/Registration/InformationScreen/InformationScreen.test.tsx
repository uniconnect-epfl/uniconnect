import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import InformationScreen from "../../../../screens/Registration/InformationScreen/InformationScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigate,
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

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(() => ({selectedInterests: ["one"], setSelectedInterests: jest.fn(), description: ""})),
}))

jest.mock("../../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
}))

describe("Information Screen", () => {
  it("renders all input fields and buttons", () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <InformationScreen />
      </SafeAreaProvider>
    )

    expect(getByText("First name*")).toBeTruthy
    expect(getByPlaceholderText("First name")).toBeTruthy
    expect(getByText("Last name*")).toBeTruthy
    expect(getByPlaceholderText("Last name")).toBeTruthy
    expect(getByText("Date of Birth*"))
    expect(getByText("JJ.MM.YYYY"))
    expect(getByText("Location"))
    expect(getByPlaceholderText("Location"))
    expect(getByText("Use my location"))
    expect(getByText("Add a description now"))
  })

  it("navigates to description up screen on footer press", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <InformationScreen />
      </SafeAreaProvider>
    )
    const DescButton = getByText("Add a description now")

    fireEvent.press(DescButton)
    expect(mockNavigate).toHaveBeenCalledWith("Description")
  })

  it("doesn't go forward of fields are not completed", () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <InformationScreen />
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.changeText(getByPlaceholderText("First name"), "")
    fireEvent.changeText(getByPlaceholderText("Last name"), "")
    fireEvent.press(NextButton)
    fireEvent.changeText(getByPlaceholderText("First name"), "name")
    fireEvent.press(NextButton)
    fireEvent.changeText(getByPlaceholderText("Last name"), "Surname")
    fireEvent.press(NextButton)
  })

})
