import React from "react"
import { render } from "@testing-library/react-native"
import { MyQrCodeScreen } from "../../../../screens/Profile/MyQrCode/MyQrCodeScreen"

jest.mock("expo-linking", () => ({
  createURL: jest.fn().mockImplementation((path) => `uniconnect://${path}`),
}))

describe("MyQrCodeScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<MyQrCodeScreen />)
    expect(component).toBeTruthy()
  })

  it("renders the right information", () => {
    const { getByText } = render(<MyQrCodeScreen />)

    expect(getByText("Uniconnect contact")).toBeTruthy()
  })
  
})