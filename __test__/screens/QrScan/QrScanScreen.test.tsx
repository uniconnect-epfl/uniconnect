import React from "react"
import { act, fireEvent, render } from "@testing-library/react-native"
import QrScanScreen from "../../../screens/QrScan/QrScanScreen"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"
import { useCameraPermissions } from "expo-camera"
import { useDebouncedCallback } from "use-debounce"
import { showErrorToast } from "../../../components/ToastMessage/toast"

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
  dangerouslyGetState: jest.fn(),
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
    location: "London",
  })),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))

jest.mock("expo-linking", () => ({
  createURL: jest.fn().mockImplementation((path) => `uniconnect://${path}`),
}))

jest.mock("expo-camera", () => {
  const ReactNative = jest.requireActual("react-native")

  return {
    ...jest.requireActual("expo-camera"),
    useCameraPermissions: jest.fn(() => {}),
    // god forgive me this
    // eslint-disable-next-line react/prop-types
    CameraView: ({ onBarcodeScanned, ...props }) => (
      <ReactNative.View
        testID="camera"
        {...props}
        onBarcodeScanned={onBarcodeScanned}
      />
    ),
  }
})

jest.mock("use-debounce", () => ({
  useDebouncedCallback: jest.fn((fn) => fn),
}))

jest.mock("../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
}))

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})
describe("QrScanScreen", () => {
  it("renders the camera when permissions are granted", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      requestPermissionMock,
    ])

    const { getByTestId } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    expect(getByTestId("camera")).toBeTruthy()
  })

  it("handles barcode scanned with same id", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      requestPermissionMock,
    ])
    const { getByTestId } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/123",
      })
    })
    expect(mockNavigation.navigate).not.toHaveBeenCalled()
  })

  it("handles barcode scanned with event", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      requestPermissionMock,
    ])
    const { getByTestId } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "event/123",
      })
    })
  })

  it("handles barcode scanned with same contact id", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      requestPermissionMock,
    ])
    const { getByTestId } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/123",
      })
    })
  })

  it("requests permission when not granted", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: false },
      requestPermissionMock,
    ])
    const { getByText } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    fireEvent.press(getByText("Authorize"))
  })

  it("debounces QR code scan results correctly 1", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      requestPermissionMock,
    ])
    const { getByTestId } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    // Simulate QR code scans
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/123",
      })
    })
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/123",
      })
    })

    // Fast forward time by 300ms
    jest.advanceTimersByTime(300)

    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/123",
      })
    })

    // Assert debounced function was called
    expect(useDebouncedCallback).toHaveBeenCalled()
    expect(showErrorToast).not.toHaveBeenCalledWith("User not found")
  })

  it("debounces QR code scan results correctly 2", () => {
    const requestPermissionMock = jest.fn()
    const mockUseCameraPermissions = useCameraPermissions as jest.Mock
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      requestPermissionMock,
    ])
    const { getByTestId } = render(
      <NavigationContainer>
        <QrScanScreen navigation={mockNavigation} />
      </NavigationContainer>
    )
    // Simulate QR code scans
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/321",
      })
    })
    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/321",
      })
    })

    // Fast forward time by 300ms
    jest.advanceTimersByTime(300)

    act(() => {
      fireEvent(getByTestId("camera"), "onBarcodeScanned", {
        type: "qr",
        data: "contact/321",
      })
    })

    // Assert debounced function was called
    expect(useDebouncedCallback).toHaveBeenCalled()
  })
})
