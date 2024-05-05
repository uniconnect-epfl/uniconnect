import React from "react"
import { render } from "@testing-library/react-native"
import ViewEventScreen from "../../../../screens/ViewDetails/ViewEventScreen/ViewEventScreen"

describe("ViewEventScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<ViewEventScreen />)
    expect(component).toBeTruthy()
  })
  
})