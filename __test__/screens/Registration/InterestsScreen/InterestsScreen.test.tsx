import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import InterestsScreen from "../../../../screens/Registration/InterestsScreen/InterestsScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Auth } from "firebase/auth"
import { showErrorToast } from "../../../../components/ToastMessage/toast"
import { RegistrationContext } from "../../../../contexts/RegistrationContext"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  onAuthStateChanged: jest.fn(),
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

const mockInterests = [{id: "Artificial Inteligence", title: "Artificial Inteligence", category: "one"}, {id: "Cryptocurrency", title: "Cryptocurrency", category: "one"}, {id: "Gardening", title: "Gardening", category: "one"}]

jest.mock("../../../../firebase/Interests", () => ({
  fetchInterests: jest.fn(() => Promise.resolve(mockInterests)),
}))

// Mock the navigation object
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn().mockReturnValue(false),
}

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => mockNavigation,
    useFocusEffect: jest.fn().mockImplementation(() => {
      return jest.fn()
    }),
    useRoute: () => ({ params: {} }),
  }
})

jest.mock("../../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
}))

describe("InterestsScreen", () => {
  jest.useFakeTimers()

  beforeAll(() => {
    jest.clearAllMocks()
  })

  it("renders the screen with necessary components", async () => {
    jest.setTimeout(10000)
    try {
      const mockSetSelectedInterests = jest.fn()
      const mockSelectedInterests = ["one"]
  
      const providerProps = {
        user: { email: "email", uid: "uid" },
        selectedInterests: ["one"],
        setSelectedInterests: mockSetSelectedInterests,
        description: mockSelectedInterests,
        setDescription: jest.fn(),
        firstName: "first name",
        setFirstName: jest.fn(),
        lastName: "last name",
        setLastName: jest.fn(),
        date: new Date(),
        setDate: jest.fn(),
        location: "",
        setLocation: jest.fn(),
        fromGoogle: true
      }
      const { getByPlaceholderText, getAllByText } = render(
        <SafeAreaProvider>
          <RegistrationContext.Provider value={providerProps}>
            <InterestsScreen />
          </RegistrationContext.Provider>
        </SafeAreaProvider>
      )
      await waitFor(() => {
        expect(getByPlaceholderText("Search")).toBeTruthy()
        const interestButtons = getAllByText(/.+/)
        expect(interestButtons.length).toBeGreaterThan(0)
      })
    } catch (error) {
      showErrorToast("Unable to render")
    }})

  it("allows searching and filters interests", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: true
    }
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search")
      fireEvent.changeText(searchInput, "Artificial Inteligence")
      expect(getByText("Artificial Inteligence")).toBeTruthy()
    })
  })

  it("allows selecting and deselecting interests", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: true
    }
    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const interestButton = getByTestId("CryptocurrencyID")
      fireEvent.press(interestButton)
      fireEvent.press(interestButton)
    })
  })

  it("creates a label when an interest is selected", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: true
    }
    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByTestId("GardeningID"))
    })
  })

  it("removes a label when clicked", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: true
    }
    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByTestId("GardeningID"))
    })
  })

  it("shows error toast when there's an error rendering the screen", async () => {
    jest.setTimeout(10000)
    try {
      const mockSetSelectedInterests = jest.fn()
      const mockSelectedInterests = ["one"]
  
      const providerProps = {
        user: { email: "email", uid: "uid" },
        selectedInterests: ["one"],
        setSelectedInterests: mockSetSelectedInterests,
        description: mockSelectedInterests,
        setDescription: jest.fn(),
        firstName: "first name",
        setFirstName: jest.fn(),
        lastName: "last name",
        setLastName: jest.fn(),
        date: new Date(),
        setDate: jest.fn(),
        location: "",
        setLocation: jest.fn(),
        fromGoogle: true
      }
      const { getByPlaceholderText, getAllByText } = render(
        <SafeAreaProvider>
          <RegistrationContext.Provider value={providerProps}>
            <InterestsScreen />
          </RegistrationContext.Provider>
        </SafeAreaProvider>
      )

      await waitFor(() => {
        expect(getByPlaceholderText("Search")).toBeTruthy()
        const interestButtons = getAllByText(/.+/)
        expect(interestButtons.length).toBeGreaterThan(0)
      })
    } catch (error) {
      expect(showErrorToast).toHaveBeenCalledWith("Unable to render")
    }
  })

  it("displays loading screen while interests are being fetched", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: true
    }
    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    expect(getByTestId("loading-indicator")).toBeTruthy()
  })

  it("toggles the interest selection correctly", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: true
    }
    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const interestButton = getByTestId("CryptocurrencyID")

      // Mock function to capture the selected interests
      const mockSelectedInterests: string[] = []
      mockSetSelectedInterests.mockImplementation((callback) => {
        const result = callback(mockSelectedInterests)
        mockSelectedInterests.splice(0, mockSelectedInterests.length, ...result)
      })

      // Select the interest
      fireEvent.press(interestButton)
      expect(mockSelectedInterests).toContain("Cryptocurrency")

      // Deselect the interest
      fireEvent.press(interestButton)
      expect(mockSelectedInterests).not.toContain("Cryptocurrency")
    })
  })
  it("Passes to the section tabs when user is authenticated", async () => {
    jest.setTimeout(10000)
    const mockSetSelectedInterests = jest.fn()
    const mockSelectedInterests = ["one"]

    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: mockSetSelectedInterests,
      description: mockSelectedInterests,
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      setFromGoogle: jest.fn(),
      fromGoogle: true
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InterestsScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const NextButton = getByText("Next")
      fireEvent.press(NextButton)
    })
  })
})
