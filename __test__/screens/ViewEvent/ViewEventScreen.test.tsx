import React from "react"
import { render } from "@testing-library/react-native"
import { ViewEventScreen } from "../../../screens/ViewEvent/ViewEventScreen"

jest.mock("@react-navigation/native", () => {
    return {
      ...jest.requireActual("@react-navigation/native"), // use actual for all non-hook parts
      useIsFocused: () => true,
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
      useRoute: () => ({
        params: {uid: 123},
      }),
    }
})

describe("ViewEventScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<ViewEventScreen />)
    expect(component).toBeTruthy()
  })
  
})