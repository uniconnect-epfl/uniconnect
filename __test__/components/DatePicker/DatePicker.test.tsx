import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import MyDateInputComponent from "../../../components/DatePicker/DatePicker"

describe("MyDateInputComponent", () => {
  const mockSetDate = jest.fn()
  const mockSetDateModal = jest.fn()
  const testDate = new Date(2021, 9, 8) // October 8, 2021

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("calls setDateModal with false when pressed", () => {
    const { getByTestId } = render(
      <MyDateInputComponent
        date={testDate}
        setDate={mockSetDate}
        setDateModal={mockSetDateModal}
      />
    )

    fireEvent.press(getByTestId("dateTimePicker"))
    expect(mockSetDateModal).toHaveBeenCalledWith(false)
  })

  it("calls setDate when the date changes", () => {
    const { getByTestId } = render(
      <MyDateInputComponent
        date={testDate}
        setDate={mockSetDate}
        setDateModal={mockSetDateModal}
      />
    )

    const newDate = new Date(2021, 9, 9) // Change to October 9, 2021
    fireEvent(getByTestId("dateTimePicker"), "onChange", null, newDate)
    expect(mockSetDate).toHaveBeenCalledWith(newDate)
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
