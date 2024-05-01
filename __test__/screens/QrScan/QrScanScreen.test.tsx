import React from "react"
import { act, fireEvent, render } from "@testing-library/react-native"
import QrScanScreen from "../../../screens/QrScan/QrScanScreen"
import { NavigationContainer, NavigationProp, ParamListBase } from "@react-navigation/native"
import { Camera } from "expo-camera"

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
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigation,
    }),
  }
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("../../../firebase/User", () => ({
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

jest.mock("expo-camera", () => {
    const actual = jest.requireActual("expo-camera")

    const camera = actual.Camera

    camera.useCameraPermissions = jest.fn().mockImplementation(() => {

        const requestPermission = () => {
            console.log("request permission called")
            return Promise.resolve({ status: "denied" })
        }

        const permission = "granted" // set the value you want

        return [
            permission, 
            requestPermission
          
        ]
    })

    console.log("camera", camera)

    return {
        __esModule: true,
        ...actual,
        Camera: camera
    }

})

describe("QrScanScreen", () => {

    it("renders correctly", () => {
        const component = render(
          <NavigationContainer>
            <QrScanScreen navigation={mockNavigation}/>
          </NavigationContainer>
        )
        expect(component).toBeTruthy()
    })

    it("renders the camera when permissions are granted", () => {
        (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: true
      }, jest.fn()])

      const { getByTestId } = render(
        <NavigationContainer>
          <QrScanScreen navigation={mockNavigation}/>
        </NavigationContainer>
      )
      expect(getByTestId("camera")).toBeTruthy()
    })
  
    it("handles barcode scanned with same id", () => {
      (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: true
      }, jest.fn()])
      const { getByTestId } = render(
        <NavigationContainer>
          <QrScanScreen navigation={mockNavigation}/>
        </NavigationContainer>
      )
      act(() => {
        fireEvent(getByTestId("camera"), "onBarCodeScanned", {
          nativeEvent: { type: "qr", data: "contact/123" }
        })
      })
      expect(mockNavigation.navigate).not.toHaveBeenCalled()
    })

    it("handles barcode scanned with same id", () => {
      (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: true
      }, jest.fn()])
      const { getByTestId } = render(
        <NavigationContainer>
          <QrScanScreen navigation={mockNavigation}/>
        </NavigationContainer>
      )
      act(() => {
        fireEvent(getByTestId("camera"), "onBarCodeScanned", {
          nativeEvent: { type: "qr", data: "event/123" }
        })
      })
    })

    it("handles barcode scanned with same id", () => {
      (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: true
      }, jest.fn()])
      const { getByTestId } = render(
        <NavigationContainer>
          <QrScanScreen navigation={mockNavigation}/>
        </NavigationContainer>
      )
      act(() => {
        fireEvent(getByTestId("camera"), "onBarCodeScanned", {
          nativeEvent: { type: "qr", data: "contact/123" }
        })
      })
    })
  
    it("requests permission when not granted", () => {
        (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: false
      }, jest.fn()])
      const { getByText } = render(
        <NavigationContainer>
          <QrScanScreen navigation={mockNavigation}/>
        </NavigationContainer>
      )
      fireEvent.press(getByText("Authorize"))
    })
    
})
