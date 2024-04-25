import React from "react"
import { act, fireEvent, render } from "@testing-library/react-native"
import QrScanScreen from "../../../screens/QrScan/QrScanScreen"
import { NavigationContainer } from "@react-navigation/native"
import { Alert } from "react-native"
import { Camera } from "expo-camera"

jest.mock('expo-camera', () => {
    const actual = jest.requireActual('expo-camera')

    const camera = actual.Camera

    camera.useCameraPermissions = jest.fn().mockImplementation(() => {

        const requestPermission = () => {
            console.log('request permission called')
            return Promise.resolve({ status: 'denied' })
        }

        const permission = 'granted' // set the value you want

        return [
            permission, 
            requestPermission
          
        ]
    })

    console.log('camera', camera)

    return {
        __esModule: true,
        ...actual,
        Camera: camera
    }

})

jest.mock("@react-navigation/native", () => {
    return {
      ...jest.requireActual("@react-navigation/native"), // use actual for all non-hook parts
      useIsFocused: () => true,
      useNavigation: () => ({
        navigate: jest.fn(),
        // Add other navigation functions that your component uses
      }),
      useRoute: () => ({
        params: {},
        // Mock other route properties as needed
      }),
    }
})

describe("QrScanScreen", () => {

    it("renders correctly", () => {
        const component = render(
          <NavigationContainer>
            <QrScanScreen/>
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
          <QrScanScreen/>
        </NavigationContainer>
      )
      expect(getByTestId("camera")).toBeTruthy()
    })
  
    it("handles barcode scanned", () => {
      (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: true
      }, jest.fn()])
      jest.spyOn(Alert, 'alert')
      const { getByTestId } = render(
        <NavigationContainer>
          <QrScanScreen />
        </NavigationContainer>
      )
      act(() => {
        fireEvent(getByTestId("camera"), "onBarCodeScanned", {
          nativeEvent: { type: "qr", data: "123" }
        })
      })
      expect(Alert.alert).toHaveBeenCalled()
      jest.clearAllMocks()
    })
  
    it("requests permission when not granted", () => {
        (Camera.useCameraPermissions as jest.Mock).mockImplementation(() => [{
          granted: false
      }, jest.fn()])
      const { getByText } = render(
        <NavigationContainer>
          <QrScanScreen />
        </NavigationContainer>
      )
      fireEvent.press(getByText("Authorize"))
    })
    
})
