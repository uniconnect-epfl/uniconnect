import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import Label from "../../../components/Label/Label"

describe("Label", () => {
  const mockOnClick = jest.fn()

  it("renders the text passed to it", () => {
    const { getByText } = render(
      <Label text="Test Label" onClick={mockOnClick} />
    )
    expect(getByText("Test Label")).toBeTruthy()
  })

  it("triggers onClick when pressed", () => {
    const { getByText } = render(
      <Label text="Clickable Label" onClick={mockOnClick} />
    )
    const labelElement = getByText("Clickable Label")
    fireEvent.press(labelElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("shows an icon", () => {
    const { getByTestId } = render(
      <Label text="Icon Label" onClick={mockOnClick} />
    )
    const icon = getByTestId("icon-cross")
    expect(icon).toBeTruthy()
  })
})
