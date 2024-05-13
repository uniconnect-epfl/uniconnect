import React from "react"
import { render } from "@testing-library/react-native"
import { BackArrow } from "../../../components/BackArrow/BackArrow"
import { NavigationContainer } from "@react-navigation/native"

const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
    return {
      ...jest.requireActual("@react-navigation/native"),
      useNavigation: () => ({
        goBack: mockGoBack,
      }),
    }
})

describe("BackArrow", () => {
  it("renders the screen", () => {
    const component = render(
    <NavigationContainer>
        <BackArrow />
    </NavigationContainer>)
    expect(component).toBeTruthy()
  })
})
