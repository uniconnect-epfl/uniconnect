import React from "react"
import { render, fireEvent, waitFor, act } from "@testing-library/react-native"
import ExternalProfileScreen from "../../../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen"

jest.mock("../../../../firebase/User", () => ({
  getUserData: jest.fn().mockResolvedValue({
    uid: "1",
    firstName: "John",
    lastName: "Doe",
    location: "Sample City",
    description: "Sample Description",
    selectedInterests: ["Sample Interest"],
    date: new Date().toISOString(),
  }),
}))

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      externalUserUid: "1",
    },
  }),
}))

jest.mock("../../../../components/GeneralProfile/GeneralProfile", () => "GeneralProfile")
jest.mock("../../../../components/ExpandableDescription/ExpandableDescription", () => "ExpandableDescription")
jest.mock("../../../../components/InputField/InputField", () => "InputField")
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons")

//mock an alert with jest
global.alert = jest.fn()

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({uid: "123"})),
  getAuth: jest.fn(() => ({currentUser: {uid: "123"}}))
}))

describe("ExternalProfileScreen", () => {
  beforeAll(() => {
    global.alert = jest.fn()
  })

  it("renders correctly", async () => {
    const { getByText } = render(<ExternalProfileScreen />)

    await waitFor(() => {
      fireEvent.press(getByText("Network"))
      expect(getByText("Message")).toBeTruthy()
      expect(getByText("Remove")).toBeTruthy()
    })
  })

  it("changes tabs correctly", async () => {
    const { getByPlaceholderText } = render(<ExternalProfileScreen />)

    await act(async () => {
      await waitFor(() => {
        const search = getByPlaceholderText('Search...')
        fireEvent.press(search)
        expect(getByPlaceholderText('Search...')).toBeTruthy()
      })
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
