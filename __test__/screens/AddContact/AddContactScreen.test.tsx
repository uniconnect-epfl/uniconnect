import React from "react"
import { render } from "@testing-library/react-native"
import { AddContactScreen } from "../../../screens/AddContact/AddContactScreen"

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
      ...actualNav,
      useRoute: () => ({
        params: { uid: "123" },
      }),
    }
})

describe("AddContactScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<AddContactScreen />)
    expect(component).toBeTruthy()
  })
  
})