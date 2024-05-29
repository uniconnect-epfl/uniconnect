import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import NetworkScreen from "../../../screens/Network/NetworkScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"
import { loginEmailPassword } from "../../../firebase/Login"

jest.mock("d3-force", () => ({
  forceSimulation: jest.fn(() => ({
    force: jest.fn().mockReturnThis(),
    nodes: jest.fn().mockReturnThis(),
    links: jest.fn().mockReturnThis(),
    alpha: jest.fn().mockReturnThis(),
    restart: jest.fn(),
    stop: jest.fn(),
    on: jest.fn().mockReturnThis(),
  })),
  forceLink: jest.fn(() => ({
    id: jest.fn().mockReturnThis(),
    distance: jest.fn().mockReturnThis(),
  })),
  forceManyBody: jest.fn(() => ({
    strength: jest.fn().mockReturnThis(),
  })),
  forceCenter: jest.fn().mockReturnThis(),
  forceCollide: jest.fn().mockReturnThis(),
}))

jest.mock("react-native/Libraries/Image/Image", () => "Image")

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}))

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

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      externalUserUid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
    },
  }),
  useNavigation: () => ({
    navigate: mockNavigation.navigate,
  }),
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

jest.mock("react-native-gesture-handler", () => {
  return {
    State: {
      END: 5,
    },
    PanGestureHandler: "View",
    PinchGestureHandler: "View",
    GestureHandlerRootView: "View",
  }
})

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" })),
  getAuth: jest.fn(() => ({
    currentUser: { uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" },
  })),
}))

beforeAll(async () => {
  global.alert = jest.fn()
  await loginEmailPassword("gasthoral@gmail.com", "Abcdefg123")
})

describe("NetworkScreen", () => {
  it("renders the screen", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      expect(component.getByText("Graph")).toBeTruthy()
      expect(component.getByText("List")).toBeTruthy()
    })
  })

  it("switches between tabs", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      expect(component.getByText("Graph")).toBeTruthy()
    })

    fireEvent.press(component.getByText("List"))

    fireEvent.press(component.getByText("Graph"))

    fireEvent.press(component.getByText("List"))

    fireEvent.press(component.getByText("Graph"))

    await waitFor(() => {
      expect(component.getByText("List")).toBeTruthy()
    })
  })
})
