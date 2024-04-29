import React from "react"
import { fireEvent, render } from "@testing-library/react-native"
import { ProfileNetwork } from "../../../../screens/Profile/ProfileNetwork/ProfileNetwork"

describe("ProfileNetwork", () => {
  it("renders correctly", () => {
    const component = render(<ProfileNetwork />)
    expect(component).toBeTruthy()
  })

  it("filters contacts based on search input", () => {
    const component = render(<ProfileNetwork />)

    fireEvent.changeText(
      component.getByPlaceholderText("Search..."),
      "Isabella"
    )
    expect(component.getByText("Isabella")).toBeTruthy()
    expect(component.queryByText("Bob")).toBeNull()
    expect(component.queryByText("Henry")).toBeNull()

    fireEvent.changeText(component.getByPlaceholderText("Search..."), "")
    expect(component.getByText("Bob")).toBeTruthy()
  })
})
