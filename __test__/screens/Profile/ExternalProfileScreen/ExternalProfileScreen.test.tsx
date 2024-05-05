import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import ExternalProfileScreen from "../../../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen"
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

jest.mock("@react-navigation/native", () => {
  const mockRoute = {
    params: {
      userId: "123", 
    },
  }

  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => mockNavigation,
    useRoute: () => mockRoute,
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

describe("ExternalProfileScreen", () => {
  beforeAll(() => {
    global.alert = jest.fn()
  })

  it("renders correctly", async () => {
    const { getByText } = render(<ExternalProfileScreen />)

    fireEvent.press(getByText("Network"))

    await waitFor(() => {
      expect(getByText("Message")).toBeTruthy()
      expect(getByText("Remove")).toBeTruthy()
    })
  })

  it("changes tabs correctly", async () => {
    const { getByText } = render(<ExternalProfileScreen />)

    await waitFor(() => {
      fireEvent.press(getByText("Interests"))
      fireEvent.press(getByText("Events"))
    })
  })

  it("handles button presses", async () => {
    const alertMock = jest.spyOn(global, "alert")
    const { getByText } = render(<ExternalProfileScreen />)

    await waitFor(() => {
      fireEvent.press(getByText("Message"))
      expect(alertMock).toHaveBeenCalledWith("To come")

      fireEvent.press(getByText("Remove"))
      expect(alertMock).toHaveBeenCalledWith("To come")
    })
  })
})
