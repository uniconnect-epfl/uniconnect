import React from "react"
import { render } from "@testing-library/react-native"
import { MyQrCodeScreen } from "../../../../screens/Profile/MyQrCode/MyQrCodeScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

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

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe("MyQrCodeScreen", () => {
  
  it("renders correctly", () => {
    const component = render(
      <SafeAreaProvider>
        <MyQrCodeScreen />
      </SafeAreaProvider>
    )
    expect(component).toBeTruthy()
  })

})