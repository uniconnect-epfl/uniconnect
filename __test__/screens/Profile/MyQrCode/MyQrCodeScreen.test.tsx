import React from "react"
import { render } from "@testing-library/react-native"
import { MyQrCodeScreen } from "../../../../screens/Profile/MyQrCode/MyQrCodeScreen"

const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("../../../../firebase/User", () => ({
  getUserData: jest.fn(() => ({
    firstName: "John",
    lastName: "Doe",
    location: "London"
  }))
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({uid: "123"})),
  getAuth: jest.fn(() => ({currentUser: {uid: "123"}}))
}))

jest.mock("expo-linking", () => ({
  createURL: jest.fn().mockImplementation((path) => `uniconnect://${path}`),
}))

describe("MyQrCodeScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<MyQrCodeScreen />)
    expect(component).toBeTruthy()
  })

})