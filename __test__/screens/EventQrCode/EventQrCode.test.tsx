import React from "react"
import { render } from "@testing-library/react-native"
import { EventQrCodeScreen } from "../../../screens/EventQrCode/EventQrCodeScreen"

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

jest.mock("expo-linking", () => ({
    createURL: jest.fn().mockImplementation((path) => `uniconnect://${path}`),
}))

describe("EventQrCodeScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<EventQrCodeScreen />)
    expect(component).toBeTruthy()
  })
  
})