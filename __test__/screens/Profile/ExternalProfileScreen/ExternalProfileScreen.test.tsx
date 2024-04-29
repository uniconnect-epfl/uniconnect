import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import ExternalProfileScreen from "../../../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen"

describe("ExternalProfileScreen", () => {
  beforeAll(() => {
    global.alert = jest.fn()
  })

  it("renders correctly", () => {
    const { getByText } = render(<ExternalProfileScreen />)

    fireEvent.press(getByText("Network"))

    expect(getByText("Hervé DelaStrite")).toBeTruthy()
    expect(getByText("Message")).toBeTruthy()
    expect(getByText("Remove")).toBeTruthy()
  })

  it("changes tabs correctly", () => {
    const { getByText } = render(<ExternalProfileScreen />)

    fireEvent.press(getByText("Interests"))
    fireEvent.press(getByText("Events"))
  })

  it("handles button presses", () => {
    const alertMock = jest.spyOn(global, "alert")
    const { getByText } = render(<ExternalProfileScreen />)

    fireEvent.press(getByText("Message"))
    expect(alertMock).toHaveBeenCalledWith("To come")

    fireEvent.press(getByText("Remove"))
    expect(alertMock).toHaveBeenCalledWith("To come")
  })
})
