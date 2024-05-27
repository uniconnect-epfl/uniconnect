import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { MyProfileScreen } from "../../../../screens/Profile/MyProfileScreen/MyProfileScreen"
import { NavigationContainer, NavigationProp, ParamListBase } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn()
} as unknown as NavigationProp<ParamListBase>

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigation,
    }),
  }
})

jest.mock("../../../../components/GeneralProfile/GeneralProfile", () => "GeneralProfile")
jest.mock("../../../../components/ExpandableDescription/ExpandableDescription", () => "ExpandableDescription")
jest.mock("../../../../components/InputField/InputField", () => "InputField")
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons")

//mock an alert with jest
global.alert = jest.fn()

const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
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
  onAuthStateChanged: jest.fn(() => ({ uid: '123' })),
  getAuth: jest.fn(() => ({ currentUser: { uid: '123' } }))
}))

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})


describe("MyProfileScreen", () => {

  it("renders correctly", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <MyProfileScreen navigation={mockNavigation} />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    await waitFor(() => {
      expect(getByText("Update")).toBeTruthy()
      expect(getByText("QR")).toBeTruthy()
    })
  })

  it("navigates to update profile when update button is pressed", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <MyProfileScreen navigation={mockNavigation} />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    await waitFor(() => {
      const updateButton = getByText("Update")
      fireEvent.press(updateButton)
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1)
    })
  })

  it("navigates to my QR code when QR button is pressed", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <MyProfileScreen navigation={mockNavigation} />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    await waitFor(() => {
      const qrButton = getByText("QR")
      fireEvent.press(qrButton)
      expect(mockNavigation.navigate).toHaveBeenCalledWith("MyQR")
    })
  })
})
