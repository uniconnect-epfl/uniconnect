import React from "react"
import { render } from "@testing-library/react-native"
import { AddContactScreen } from "../../../screens/AddContact/AddContactScreen"

describe("AddContactScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<AddContactScreen />)
    expect(component).toBeTruthy()
  })
  
})