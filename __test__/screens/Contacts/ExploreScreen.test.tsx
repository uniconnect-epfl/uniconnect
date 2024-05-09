import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react-native"
import ExploreScreen from "../../../screens/Contacts/ExploreScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
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

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigation.navigate,
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

beforeAll(() => {
  global.alert = jest.fn()
})

describe("ExploreScreen", () => {
  it("renders the screen", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExploreScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })

  it("navigates to profile screen when clicking on contact", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExploreScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const button = component.getByText("Isabella Rodriguez")

    await act(async () => {
      fireEvent.press(button)
    })
    expect(mockNavigation.navigate).toHaveBeenCalledWith("ExternalProfile", {
      uid: "8",
    })
  })

  it("navigates to profile screen when clicking on contact in graph view", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExploreScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const button = component.getByText("Graph View")

    await act(async () => {
      fireEvent.press(button)
    })

    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()

    await act(async () => {
      fireEvent(node1, "pressIn")
      fireEvent(node1, "pressIn")
    })

    await waitFor(() => {
      const modal = component.getByTestId("modal")
      expect(modal).toBeTruthy()
      expect(modal.props.visible).toBe(true)
    })

    const modalImage = component.getByTestId("modal-profile-picture")

    await act(async () => {
      fireEvent(modalImage, "press")
    })

    await waitFor(() => {
      expect(component.queryByTestId("modal")).toBeNull()
    })

    expect(mockNavigation.navigate).toHaveBeenCalledWith("ExternalProfile", {
      uid: "1",
    })
  })

  it("Magic Pressed", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExploreScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const button = component.getByText("Graph View")

    await act(async () => {
      fireEvent.press(button)
    })

    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()

    await act(async () => {
      fireEvent(node1, "longPress")
      await new Promise((resolve) => setTimeout(resolve, 2000))
    })

    expect(node1).toBeTruthy()

    await act(async () => {
      fireEvent(node1, "longPress")
      await new Promise((resolve) => setTimeout(resolve, 2000))
    })
  })
})
