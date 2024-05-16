import React from "react"
import { render } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import MainStackNavigator from "../../../navigation/Main/MainStackNavigator"
import { Auth, User, onAuthStateChanged } from "firebase/auth"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  onAuthStateChanged: jest.fn(),
}))

jest.mock("../../../components/GoogleSignInButton/GoogleSignInButton", () => {
  return {
    GoogleSignInButton: () => {
      "Continue with Google"
    },
  }
})

describe("MainStackNavigator", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the stack navigator with HomeTabs when user is logged in", () => {
    const mockUser: User = { uid: "123" } as User
    const mockOnAuthStateChanged = jest.fn((auth, callback) => {
      callback(mockUser)
      return jest.fn()
    })

    const mockFunction = onAuthStateChanged as jest.Mock
    mockFunction.mockImplementation(mockOnAuthStateChanged)

    render(
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    )

    expect(mockOnAuthStateChanged).toHaveBeenCalledTimes(1)
  })

})
