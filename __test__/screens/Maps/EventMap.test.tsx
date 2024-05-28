import { fireEvent, render } from "@testing-library/react-native"
import Map from "../../../screens/Maps/EventMap"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        events: [
          {
            title: "Balelek 2023",
            location: "EPFL, Agora",
            point: { x: 46.51858962578904, y: 6.566048509782951 },
            description: "Music festival 2023",
            date: new Date("2024-05-03"),
            imageUrl: "https://www.google.com",
          },
        ],
      },
    }),
  }
})

jest.mock("react-native-maps", () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockImplementation(({ children, ...rest }) => (
        <div {...rest}>{children}</div>
      )), // Mocking MapView
    Marker: jest
      .fn()
      .mockImplementation(({ children, ...rest }) => (
        <div {...rest}>{children}</div>
      )), // Mocking Marker
    Callout: jest
      .fn()
      .mockImplementation(({ children, ...rest }) => (
        <div {...rest}>{children}</div>
      )), // Mocking Callout
    PROVIDER_GOOGLE: "google",
  }
})

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

describe("Map", () => {
  it("renders the map with markers for each event", () => {
    const component = render(<Map />)

    const event1 = component.getByTestId("marker-Balelek 2023")
    expect(event1).toBeTruthy()
  })

  it("should display a modal when a marker is pressed", () => {
    const component = render(<Map />)
    const event1 = component.getByTestId("marker-Balelek 2023")
    fireEvent.press(event1)
    const modal = component.getByTestId("modal")
    expect(modal).toBeTruthy()

    const modalTouchable = component.getByTestId("modal-touchable")
    fireEvent.press(modalTouchable)
  })

  it("should navigate back when the back button is pressed", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <Map />
      </SafeAreaProvider>
    )
    const backButton = getByTestId("back-arrow")
    fireEvent.press(backButton)
  })
})
