import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import ViewEventScreen from "../../../../screens/ViewDetails/ViewEventScreen/ViewEventScreen"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

export * from "@react-native-async-storage/async-storage/jest/async-storage-mock"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))

jest.mock("../../../../firebase/User", () => ({
  getUserData: jest
    .fn()
    .mockResolvedValue({ uid: "123", firstName: "John", lastName: "Doe" }),
  updateUserEvents: jest.fn().mockResolvedValue(true),
}))

const mockGetEventData = jest.fn()

jest.mock("../../../../firebase/ManageEvents", () => ({
  getEventData: jest.fn((...args) => mockGetEventData(...args)),
  updateEventData: jest.fn().mockResolvedValue(true),
}))

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useRoute: () => ({
      params: { onHostPress: jest.fn(), eventUid: "123" },
    }),
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

//mock an alert with jest
global.alert = jest.fn()

describe("ViewEventScreen", () => {
  it("renders correctly", () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ViewEventScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    expect(component).toBeTruthy()
  })

  it("can navigate to host profile", async () => {
    const eventData = {
      uid: "123",
      title: "Event",
      location: "location",
      point: { x: 40.712776, y: -74.005974 },
      date: new Date().toISOString(),
      host: "456",
      participants: ["123"],
      description: "description",
      imageUrl: "imageUrl",
      interests: ["interest1", "interest2"],
    }
    mockGetEventData.mockResolvedValueOnce(eventData)
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ViewEventScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    await waitFor(() => {
      expect(getByText("Hosted By")).toBeTruthy()
    })

    fireEvent.press(getByText("Hosted By"))
  })

  it("can click on participate", async () => {
    const eventData = {
      uid: "123",
      title: "Event",
      location: "location",
      point: { x: 40.712776, y: -74.005974 },
      date: new Date().toISOString(),
      host: "456",
      participants: ["123"],
      description: "description",
      imageUrl: "imageUrl",
      interests: ["interest1", "interest2"],
    }
    mockGetEventData.mockResolvedValueOnce(eventData)

    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ViewEventScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    await waitFor(() => {
      expect(getByText("Participate")).toBeTruthy()
    })

    fireEvent.press(getByText("Participate"))
  })

  it("can click on Edit", async () => {
    const eventData = {
      uid: "123",
      title: "Event",
      location: "location",
      point: { x: 40.712776, y: -74.005974 },
      date: new Date().toISOString(),
      host: "123",
      participants: ["123"],
      description: "description",
      imageUrl: "imageUrl",
      interests: ["interest1", "interest2"],
    }
    mockGetEventData.mockResolvedValueOnce(eventData)
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ViewEventScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    await waitFor(() => {
      expect(getByText("Hosted by you")).toBeTruthy()
    })
  })
})
