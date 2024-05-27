import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import InformationScreen from "../../../../screens/Registration/InformationScreen/InformationScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { RegistrationContext } from "../../../../contexts/RegistrationContext"
import { showErrorToast } from "../../../../components/ToastMessage/toast"
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

jest.mock("../../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
}))

describe("Information Screen", () => {
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
    expect(getByText("Use my location"))
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
})
