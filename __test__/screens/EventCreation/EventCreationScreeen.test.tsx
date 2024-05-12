import React from "react"
import { fireEvent, render } from "@testing-library/react-native"
import EventCreationScreen from "../../../screens/EventCreation/EventCreationScreen"
import { Firestore } from "firebase/firestore"
import { SafeAreaProvider } from "react-native-safe-area-context"

const mockGoBack = jest.fn()

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

describe("EventCreationScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <SafeAreaProvider>
        <EventCreationScreen />
      </SafeAreaProvider>
    )

    expect(getByText("Event")).toBeTruthy()
    expect(getByPlaceholderText("Title")).toBeTruthy()
  })

  it("allows toggling between event and announcement", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <EventCreationScreen />
      </SafeAreaProvider>
    )
    const toggleButton = getByText("Event")
    fireEvent.press(toggleButton)
    expect(getByText("Announcement")).toBeTruthy()
    fireEvent.press(toggleButton)
    expect(getByText("Event")).toBeTruthy()
  })

  it("shows date input fields when event is selected", () => {
    const { queryByPlaceholderText } = render(
      <SafeAreaProvider>
        <EventCreationScreen />
      </SafeAreaProvider>
    )
    expect(queryByPlaceholderText("Start Date")).toBeTruthy()
    expect(queryByPlaceholderText("End Date")).toBeTruthy()
  })

  it('should handle "Add a description" button press', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <EventCreationScreen />
      </SafeAreaProvider>
    )
    const descriptionButton = getByText("Add a description")
    fireEvent.press(descriptionButton)
    // You can expand this to check if a specific function is called or a modal/dialog opens
  })

  it('should handle "Validate" button press', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <EventCreationScreen />
      </SafeAreaProvider>
    )
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
    // You can expand this to check if a specific function is called or if navigation occurs
  })
})
