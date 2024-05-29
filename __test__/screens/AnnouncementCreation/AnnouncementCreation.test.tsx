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
        isAnnouncement: true,
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
  it("Creates an announcement", async () => {
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
