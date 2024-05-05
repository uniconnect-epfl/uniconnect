import React from "react"
import { render } from "@testing-library/react-native"
import ViewEventScreen from "../../../../screens/ViewDetails/ViewEventScreen/ViewEventScreen"

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
      ...actualNav,
      useRoute: () => ({
        params: { uid: "123" },
      }),
    }
})

describe("ViewEventScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<ViewEventScreen />)
    expect(component).toBeTruthy()
  })
  
})