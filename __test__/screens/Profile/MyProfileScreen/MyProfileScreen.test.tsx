import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { MyProfileScreen } from "../../../../screens/Profile/MyProfileScreen/MyProfileScreen"
import { useNavigation } from "@react-navigation/native"

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}))

jest.mock("../../../../components/GeneralProfile/GeneralProfile", () => "GeneralProfile")
jest.mock("../../../../components/ExpandableDescription/ExpandableDescription", () => "ExpandableDescription")
jest.mock("../../../../components/InputField/InputField", () => "InputField")
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons")

describe("MyProfileScreen", () => {
  const navigateMock = jest.fn()

  beforeEach(() => {
    // Setup navigation mock
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const { getByText } = render(<MyProfileScreen />)
    
    expect(getByText("Update")).toBeTruthy()
    expect(getByText("QR")).toBeTruthy()
  })

  it("navigates to update profile when update button is pressed", () => {
    const { getByText } = render(<MyProfileScreen />)
    const updateButton = getByText("Update")
    
    fireEvent.press(updateButton)
    expect(navigateMock).toHaveBeenCalledWith("Update my profile")
  })

  it("navigates to my QR code when QR button is pressed", () => {
    const { getByText } = render(<MyProfileScreen />)
    const qrButton = getByText("QR")
    
    fireEvent.press(qrButton)
    expect(navigateMock).toHaveBeenCalledWith("My QR code")
  })
})
