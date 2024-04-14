import React from "react"
import { render } from "@testing-library/react-native"
import Divider from "../../../components/Divider/Divider"

describe("Divider", () => {
  it("renders the screen", () => {
    const component = render(<Divider />)
    expect(component).toBeTruthy()
  })
})
