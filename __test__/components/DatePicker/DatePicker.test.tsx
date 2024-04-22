import React from "react"
import { render, fireEvent, act } from "@testing-library/react-native"
import MyDateInputComponent from "../../../components/DatePicker/DatePicker"

describe("MyDateInputComponent", () => {
  const mockSetDate = jest.fn()
  const mockSetDateModal = jest.fn()
  const testDate = new Date(2021, 9, 8) // October 8, 2021

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("calls setDate when the date changes", () => {
    const { getByTestId } = render(
      <MyDateInputComponent
        date={testDate}
        setDate={mockSetDate}
        setDateModal={mockSetDateModal}
      />
    )

    const dateTimePicker = getByTestId("dateTimePicker")
    expect(dateTimePicker).toBeDefined()

    // Simulate change event by directly invoking onChange handler
    const selectedDate = new Date(2021, 9, 9) // New date to simulate change
    act(() => {
      fireEvent(dateTimePicker, "onChange", {
        nativeEvent: { timestamp: selectedDate },
      })
    })

    // Check if setDate is called with the updated date
    expect(mockSetDate).toHaveBeenCalledWith(selectedDate)
  })

  it("closes the date picker when pressing outside", () => {
    const { getByTestId } = render(
      <MyDateInputComponent
        date={testDate}
        setDate={mockSetDate}
        setDateModal={mockSetDateModal}
      />
    )
    fireEvent.press(getByTestId("backdropPressable"))
    expect(mockSetDateModal).toHaveBeenCalledWith(false)
  })
})
