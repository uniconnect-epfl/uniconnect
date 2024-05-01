import React from "react"
import { fireEvent, render } from "@testing-library/react-native"
import EventCreationScreen from "../../../screens/EventCreation/EventCreationScreen"

const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

// Component import

describe("EventCreationScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<EventCreationScreen />)
    expect(getByText("Announcement")).toBeTruthy()
    expect(getByPlaceholderText("Title")).toBeTruthy()
  })

  it("allows toggling between event and announcement", () => {
    const { getByText } = render(<EventCreationScreen />)
    const toggleButton = getByText("Announcement")
    fireEvent.press(toggleButton)
    expect(getByText("Event")).toBeTruthy()
    fireEvent.press(toggleButton)
    expect(getByText("Announcement")).toBeTruthy()
  })

  it("shows date input fields when event is selected", () => {
    const { getByText, queryByPlaceholderText } = render(
      <EventCreationScreen />
    )
    expect(queryByPlaceholderText("Start Date")).toBeNull()
    fireEvent.press(getByText("Announcement"))
    expect(queryByPlaceholderText("Start Date")).toBeTruthy()
    expect(queryByPlaceholderText("End Date")).toBeTruthy()
  })

  it('should handle "Add a description" button press', () => {
    const { getByText } = render(<EventCreationScreen />)
    const descriptionButton = getByText("Add a description")
    fireEvent.press(descriptionButton)
    // You can expand this to check if a specific function is called or a modal/dialog opens
  })

  it('should handle "Validate" button press', () => {
    const { getByText } = render(<EventCreationScreen />)
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
    // You can expand this to check if a specific function is called or if navigation occurs
  })
})
