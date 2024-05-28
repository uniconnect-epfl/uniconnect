import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import EventCreationScreen from "../../../screens/EventCreation/EventCreationScreen"
import { RegistrationContext } from "../../../contexts/RegistrationContext"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import { Firestore } from "firebase/firestore"

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

const mockGoBack = jest.fn()

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

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore")

  return {
    ...originalModule,
    getFirestore: jest.fn(() => ({} as Firestore)),
  }
})

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useRoute: () => ({
      params: {
        externalUserUid: "1",
      },
    }),
    useNavigation: () => ({
      navigate: mockNavigation.navigate,
      goBack: mockGoBack,
    }),
  }
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

describe("EventCreationScreen", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    expect(getByText("Validate")).toBeTruthy()
    expect(getByText("Add a description")).toBeTruthy()
    expect(getByText("Choose up to three interests")).toBeTruthy()
  })

  it("create event with location", () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    // Set up the provider props
    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: { x: 0, y: 0 },
      location: "test",
      userId: "yep",
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("create announcement with location", () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    // Set up the provider props
    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: { x: 0, y: 0 },
      location: "test",
      userId: "salue",
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("alert with user id not defined", () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    // Set up the provider props
    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: undefined,
      location: "test",
      userId: undefined,
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("alert with user not defined", () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    // Set up the provider props
    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: undefined,
      location: "test",
      user: null,
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("updates title input correctly", () => {
    const { getByPlaceholderText } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    const titleInput = getByPlaceholderText("Chemistry x Python")
    fireEvent.changeText(titleInput, "New Event Title")
    expect(titleInput.props.value).toBe("New Event Title")
  })

  it('should handle "Add a description" button press', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <EventCreationScreen navigation={mockNavigation} />
      </SafeAreaProvider>
    )
    const descriptionButton = getByText("Add a description")
    fireEvent.press(descriptionButton)
    // You can expand this to check if a specific function is called or a modal/dialog opens
  })

  it('should handle "Validate" button press and call setDescription', () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    // Set up the provider props
    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }

    // Render the component wrapped in the mock provider directly
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    // Locate the Validate button and simulate a press
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("checks if the description button navigates correctly", () => {
    const { getByText } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    fireEvent.press(getByText("Add a description"))
    //expect(mockNavigation).toHaveBeenCalledWith("Description")
  })

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    fireEvent.press(getByTestId("back-arrow"))
    //expect(mockGoBack).toHaveBeenCalled()
  })

  it("updates title input correctly", () => {
    const { getByPlaceholderText } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    const titleInput = getByPlaceholderText("Chemistry x Python")
    fireEvent.changeText(titleInput, "New Event Title")
    expect(titleInput.props.value).toBe("New Event Title")
  })

  it("handles interest tag selection", () => {
    const { getByText } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    fireEvent.press(getByText("Choose up to three interests"))
    // Assume modal or dropdown opens, simulate selecting a tag
    // Add mock function or state update check here
  })

  it("renders different UI elements based on the isAnnouncement prop", () => {
    const { queryByText, rerender } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    rerender(<EventCreationScreen navigation={mockNavigation} />)
    expect(queryByText("Add a location")).toBeTruthy()
  })

  it("can add locations", () => {
    const { getByText } = render(
      <EventCreationScreen navigation={mockNavigation} />
    )
    fireEvent.press(getByText("Add a location"))
  })

  it("shows error when user ID is missing for event creation", async () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: { x: 0, y: 0 },
      location: "test",
      userId: undefined, // userId is missing
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }

    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("shows error when location point is missing for event creation", async () => {
    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: undefined, // Location point is missing
      location: "test",
      userId: "123",
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }

    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("Creates an announcement", async () => {
    jest.unmock("@react-navigation/native")

    // Mock the module for this specific test
    jest.mock("@react-navigation/native", () => {
      return {
        ...jest.requireActual("@react-navigation/native"),
        useRoute: () => ({
          params: {
            isAnnouncement: true,
            externalUserUid: "1",
          },
        }),
        useNavigation: () => ({
          navigate: mockNavigation.navigate,
          goBack: mockGoBack,
        }),
      }
    })

    const mockSetDescription = jest.fn()
    const mockSetSelectedInterests = jest.fn()

    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
      point: undefined,
      location: "test",
      userId: "123",
      selectedInterests: [],
      setSelectedInterests: mockSetSelectedInterests,
    }

    console.log("BONJOUR")
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen navigation={mockNavigation} />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const validateButton = getByText("Validate")
      expect(validateButton).toBeTruthy()
      fireEvent.press(validateButton), { timeout: 5000 }
    })
  }, 10000)
})
