import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react-native"
import NetworkScreen from "../../../screens/Contacts/NetworkScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"
import { FirebaseError } from "firebase/app"
import { Auth } from "firebase/auth"
import { User } from "../../../types/User"

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

const mockFirebaseError = new FirebaseError("auth/invalid-credential", "test")

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({} as Auth)),
  createUserWithEmailAndPassword: jest
    .fn()
    .mockImplementation((auth, email, password) => {
      if (email === "test@example.com" && password === "password") {
        return Promise.resolve(void 0)
      } else {
        return Promise.reject(new Error("Failed to create account"))
      }
    }),
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  signInWithEmailAndPassword: jest
    .fn()
    .mockImplementation((auth, email, password) => {
      if (email === "test@example.com" && password === "password") {
        return Promise.resolve({} as User)
      } else if (email === "firebase@example.com") {
        return Promise.reject(mockFirebaseError as FirebaseError)
      }
      return Promise.reject(new Error("Failed to login"))
    }),
}))

beforeAll(() => {
  global.alert = jest.fn()
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
      expect(component).toBeTruthy()
    })
  })

  it("filters contacts based on search input", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
      expect(node1).toBeTruthy()
    })
  })

  it("Clicking on a contact in the list navigates to the profile screen", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const button = component.getByText("List")

    await act(async () => {
      fireEvent.press(button)
    })

    await waitFor(() => {
      const profileButton = component.getByText("Aidas Venckunas")
      fireEvent.press(profileButton)
      expect(mockNavigation.navigate).toHaveBeenCalled()
    })
  })

  it("Double pressing a node displays a modal", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
      expect(node1).toBeTruthy()
      fireEvent(node1, "pressIn")
      fireEvent(node1, "pressIn")
    })

    const modal = component.getByTestId("modal")
    expect(modal).toBeTruthy()
  })

  it("Pressing outside the modal closes it", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
      expect(node1).toBeTruthy()
      fireEvent(node1, "pressIn")
      fireEvent(node1, "pressIn")
    })

    const modal = component.getByTestId("modal")
    expect(modal).toBeTruthy()

    const modalPressOut = component.getByTestId("modal-touchable")
    expect(modalPressOut).toBeTruthy()

    await act(async () => {
      fireEvent.press(modalPressOut)
    })

    expect(component.queryByTestId("modal")).toBeNull()
  })

  it("Double pressing and clicking on the profile picture navigates to the contact's profile", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
      expect(node1).toBeTruthy()
      fireEvent(node1, "pressIn")
      fireEvent(node1, "pressIn")
    })

    const modal = component.getByTestId("modal")
    expect(modal).toBeTruthy()

    const modalProfilePicture = component.getByTestId("modal-profile-picture")
    expect(modalProfilePicture).toBeTruthy()

    await act(async () => {
      fireEvent.press(modalProfilePicture)
    })

    expect(mockNavigation.navigate).toHaveBeenCalled()
  })

  it("Long pressing the constrained node at first does not change anything", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 3000))
  })

  it("Long pressing any other node at first change the graph", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-LMhTaRznIgaJRQK8Dg8CW3naje92")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 2500))

    await waitFor(() => {
      const node2 = component.getByTestId("node-fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
      expect(node2).toBeTruthy()
      act(() => {
        fireEvent(node2, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 2500))
  }, 6000)

  it("Long pressing any other node at first change the graph and pressing it again resets", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-LMhTaRznIgaJRQK8Dg8CW3naje92")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 2500))

    await waitFor(() => {
      const node1 = component.getByTestId("node-LMhTaRznIgaJRQK8Dg8CW3naje92")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 2500))
  }, 6000)

  it("Long pressing any other node at first change the graph and long pressing another one changes the graph directly", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-LMhTaRznIgaJRQK8Dg8CW3naje92")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 2500))

    await waitFor(() => {
      const node2 = component.getByTestId("node-isO9Gsj2HKZFGLSYZyDoTSZ1fLx1")
      expect(node2).toBeTruthy()
      act(() => {
        fireEvent(node2, "longPress")
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 2500))
  }, 6000)

  it("Pressing the searchbar and submitting it filters the contacts", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const touchable = component.getByTestId("touchable")
      expect(touchable).toBeTruthy()

      const searchBar = component.getByPlaceholderText("Search...")
      expect(searchBar).toBeTruthy()

      act(() => {
        fireEvent(searchBar, "press")
      })

      act(() => {
        fireEvent.changeText(searchBar, "Aidas")
      })

      expect(searchBar.props.value).toBe("Aidas")

      act(() => {
        fireEvent(touchable, "press")
      })
    })
  })

  it("Searching contact on list view works", async () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <NetworkScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const button = component.getByText("List")

    await act(async () => {
      fireEvent.press(button)
    })
    await waitFor(() => {
      const searchBar = component.getByPlaceholderText("Search...")
      expect(searchBar).toBeTruthy()

      act(() => {
        fireEvent.changeText(searchBar, "Aidas")
      })

      expect(searchBar.props.value).toBe("Aidas")
    })
  })
})
