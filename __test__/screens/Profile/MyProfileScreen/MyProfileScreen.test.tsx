import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { MyProfileScreen } from "../../../../screens/Profile/MyProfileScreen/MyProfileScreen"
import { NavigationProp, ParamListBase } from "@react-navigation/native"

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
  onAuthStateChanged: jest.fn(() => ({uid: '123'})),
  getAuth: jest.fn(() => ({currentUser: {uid: '123'}}))
}))


describe("MyProfileScreen", () => {

  it("renders correctly", async () => {
    const { getByText } = render(<MyProfileScreen navigation={mockNavigation}/>)
    
    await waitFor(() => {
      expect(getByText("Update")).toBeTruthy()
      expect(getByText("QR")).toBeTruthy()
    })
  })

  it("navigates to update profile when update button is pressed", async () => {
    const { getByText } = render(<MyProfileScreen navigation={mockNavigation}/>)

    await waitFor(() => {
      const updateButton = getByText("Update")
      fireEvent.press(updateButton)
      expect(mockNavigation.navigate).toHaveBeenCalledWith("UpdateProfile")
    })
  })

  it("navigates to my QR code when QR button is pressed", async () => {
    const { getByText } = render(<MyProfileScreen navigation={mockNavigation}/>)

    await waitFor(() => {
      const qrButton = getByText("QR")
      fireEvent.press(qrButton)
      expect(mockNavigation.navigate).toHaveBeenCalledWith("MyQR")
    })
  })
})
