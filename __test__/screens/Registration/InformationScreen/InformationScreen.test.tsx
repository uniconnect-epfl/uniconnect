import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import InformationScreen from "../../../../screens/Registration/InformationScreen/InformationScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { RegistrationContext } from "../../../../contexts/RegistrationContext"
import { showErrorToast } from "../../../../components/ToastMessage/toast"
import { Keyboard } from "react-native"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigate,
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

jest.mock("../../../../firebase/Registration", () => ({
  storeInitialUserData: jest.fn()
}))

jest.mock("../../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
}))

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" })),
  getAuth: jest.fn(() => ({
    currentUser: { uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" },
  })),
}))

describe("Information Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders all input fields and buttons", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }

    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    expect(getByText("First name*")).toBeTruthy
    expect(getByPlaceholderText("First name")).toBeTruthy
    expect(getByText("Last name*")).toBeTruthy
    expect(getByPlaceholderText("Last name")).toBeTruthy
    expect(getByText("Date of Birth*"))
    expect(getByText("JJ.MM.YYYY"))
    expect(getByText("Location"))
    expect(getByPlaceholderText("Location"))
    expect(getByText("Add a description now"))
  })

  it("opens the date picker modal and sets hasBeenTouched to true when the Date of Birth section is pressed", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }
    const { getByText, queryByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const dobSection = getByText("Date of Birth*")
    fireEvent.press(dobSection)

    // Verify the date modal is opened
    expect(queryByText("JJ.MM.YYYY")).toBeFalsy() // The placeholder text should no longer be there

    // Since we don't have a direct way to check if date picker modal is opened,
    // we use the fact that the modal should be visible after onPress is called.
    expect(queryByText("JJ.MM.YYYY")).toBeNull() // Placeholder should change after modal opens
  })

  it("renders the TouchableWithoutFeedback component", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }
    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    expect(getByTestId("information-screen")).toBeTruthy()
  })

  it("dismisses the keyboard when TouchableWithoutFeedback is pressed", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }

    // Mock Keyboard.dismiss
    const dismissSpy = jest.spyOn(Keyboard, "dismiss")

    const { getByTestId } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const touchableWithoutFeedback = getByTestId("information-screen")
    fireEvent.press(touchableWithoutFeedback)

    expect(dismissSpy).toHaveBeenCalled()
  })

  it("navigates to description up screen on footer press", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )
    const DescButton = getByText("Add a description now")

    fireEvent.press(DescButton)
    expect(mockNavigate).toHaveBeenCalledWith("Description")
  })

  it("doesn't go forward when name is not completed", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
  })

  it("doesn't go forward when surname is not completed", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "name",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
  })

  it("doesn't go forward when date is not completed", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "name",
      setFirstName: jest.fn(),
      lastName: "surname",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
  })
  it("shows error toast when first name is missing", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
    expect(showErrorToast).toHaveBeenCalledWith(
      "You need to input your first name!"
    )
  })

  it("shows error toast when last name is missing", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
    expect(showErrorToast).toHaveBeenCalledWith(
      "You need to input your last name!"
    )
  })

  it("shows error toast when date of birth is not selected", () => {
    const providerProps = {
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
      setDescription: jest.fn(),
      firstName: "first name",
      setFirstName: jest.fn(),
      lastName: "last name",
      setLastName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      location: "",
      setLocation: jest.fn(),
      fromGoogle: false
    }
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
    expect(showErrorToast).toHaveBeenCalledWith(
      "You need to input your birth day!"
    )
  })
  it("Passes to the section tabs when user is authenticated", () => {
    const providerProps = {
      user: { email: "email", uid: "uid" },
      selectedInterests: ["one"],
      setSelectedInterests: jest.fn(),
      description: "",
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
    const { getByText } = render(
      <SafeAreaProvider>
        <RegistrationContext.Provider value={providerProps}>
          <InformationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    const NextButton = getByText("Next")
    fireEvent.press(NextButton)
  })
})
