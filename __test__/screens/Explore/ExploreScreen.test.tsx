import { render, fireEvent, waitFor, act } from "@testing-library/react-native"
import ExploreScreen from "../../../screens/Explore/ExploreScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import React from "react"
import { Firestore } from "firebase/firestore"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"
import { loginEmailPassword } from "../../../firebase/Login"

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

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
    ...jest.requireActual("@react-navigation/native"), // keep all the original implementations
    useNavigation: () => mockNavigation,
  }
})

jest.mock("../../../firebase/ManageEvents", () => ({
  getAllFutureEvents: jest.fn(() =>
    Promise.resolve([
      {
        date: "2025-05-06T11:28:00.000Z",
        description: "",
        host: "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
        imageUrl: "imageUrl",
        location: "Route Jean-Daniel Colladon, 1025 Ecublens, ch",
        participants: ["dFcpWnfaNTOWBFyJnoJSIL6xyi32"],
        point: { x: 46.518034038062, y: 6.564324013888836 },
        title: "Upcoming Event For Tests",
        uid: "9gN58J2xZ7JNSCkR70HZ",
      },
    ])
  ),
  getAllPastEvents: jest.fn(() =>
    Promise.resolve([
      {
        date: "2023-05-04T11:26:00.000Z",
        description: "",
        host: "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
        imageUrl: "imageUrl",
        location: "Avenue du Tir-Fédéral 92",
        participants: ["dFcpWnfaNTOWBFyJnoJSIL6xyi32"],
        point: { x: 46.5278097, y: 6.56597 },
        title: "Past Event For Tests",
        uid: "phTN5wgsld3da35OKnFj",
      },
    ])
  ),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" })),
  getAuth: jest.fn(() => ({
    currentUser: { uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" },
  })),
}))

jest.mock("../../../firebase/User", () => ({
  getUserData: jest.fn().mockReturnValue({
    date: { nanoseconds: 0, seconds: 1064095200 },
    description: "",
    email: "gasthoral@gmail.com",
    events: ["phTN5wgsld3da35OKnFj", "9gN58J2xZ7JNSCkR70HZ"],
    firstName: "Gaspard",
    friends: [
      "ydz5dQEJraPR69E9QT22Ny92pw63",
      "wFz3KQa6lgUaT5dt7bLQHD59Loj1",
      "fJBXEJDLJ0XFjbFcsKYNvp9wBPF2",
    ],
    lastName: "Thoral",
    location: "Paris",
    selectedInterests: ["Artificial Inteligence", "Blockchain"],
    uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
  }),
}))

beforeAll(async () => {
  global.alert = jest.fn()
  await loginEmailPassword("gasthoral@gmail.com", "Abcdefg123")
})

describe("ExploreScreen", () => {
  it("renders the Event screen", () => {
    const component = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <ExploreScreen navigation={mockNavigation} />
        </SafeAreaProvider>
      </NavigationContainer>
    )
    expect(component).toBeTruthy()

    const events = component.getByText("Events")
    expect(events).toBeTruthy()

    const announcements = component.getByText("Announcements")
    expect(announcements).toBeTruthy()
  })

  it("filters events based on search input", async () => {
    const component = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <ExploreScreen navigation={mockNavigation} />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    await waitFor(() => {
      fireEvent.changeText(
        component.getByPlaceholderText("Search..."),
        "Past Event For Tests"
      )
      expect(
        component.getByTestId("event-card-Past Event For Tests")
      ).toBeTruthy()

      fireEvent.changeText(component.getByPlaceholderText("Search..."), "")
      expect(
        component.getByTestId("event-card-Upcoming Event For Tests")
      ).toBeTruthy()

      fireEvent.press(component.getByText("Map View"))
      expect(component.getByText("Map View")).toBeTruthy()
    })
  })

  it("keyboard disapear if we click aside", async () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <ExploreScreen navigation={mockNavigation} />
        </SafeAreaProvider>
      </NavigationContainer>
    )
    await act(async () => {
      await waitFor(() => {
        const search = getByPlaceholderText("Search...")
        fireEvent.press(search)
        expect(getByPlaceholderText("Search...")).toBeTruthy()
      })
    })
  })
})
