import React from "react"
import { render, fireEvent, act } from "@testing-library/react-native"
import InformationScreen from "../../../../screens/Registration/InformationScreen/InformationScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import MyDateInputComponent from "../../../../components/DatePicker/DatePicker"

describe("MyDateInputComponent", () => {
  const mockSetDate = jest.fn()
  const mockSetDateModal = jest.fn()
  const testDate = new Date(2021, 9, 8) // October 8, 2021

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("calls setDate when the date changes", () => {
    const { getByTestId } = render(
      <MyDateInputComponent
        date={testDate}
        setDate={mockSetDate}
        setDateModal={mockSetDateModal}
      />
    )

    const dateTimePicker = getByTestId("dateTimePicker")
    expect(dateTimePicker).toBeDefined()

    // Simulate change event by directly invoking onChange handler
    const selectedDate = new Date(2021, 9, 9) // New date to simulate change
    act(() => {
      fireEvent(dateTimePicker, "onChange", {
        nativeEvent: { timestamp: selectedDate },
      })
    })

    // Check if setDate is called with the updated date
    expect(mockSetDate).toHaveBeenCalledWith(selectedDate)
  })
})

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

jest.mock("@react-native-community/datetimepicker", () => {
  return {
    __esModule: true,
    MyDateInputComponent: jest.fn().mockImplementation(({ onChange }) => {
      // Use a Pressable to simulate user interaction in tests
      const handleChange = () => onChange({ type: "set" }, new Date()) // Simulate changing the date

      return <div onClick={handleChange}></div>
    }),
  }
})

describe("Information Screen", () => {
  it("renders all input fields and buttons", () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <InformationScreen />
        </NavigationContainer>
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
    expect(getByText("Use my location?"))
    expect(getByText("Add a description now"))
  })

  it.only("toggles date picker modal visibility on press", () => {
    const { getByText, queryByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <InformationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const dateOfBirthField = getByText("Date of Birth*")
    fireEvent.press(dateOfBirthField)
    // Assuming MyDateInputComponent renders something identifiable
    expect(queryByText("MyDateInputComponent")).toBeTruthy()
  })

  it("navigates to description up screen on footer press", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <InformationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const DescButton = getByText("Add a description now")

    fireEvent.press(DescButton)
    expect(mockNavigate).toHaveBeenCalledWith("Description")
  })
})
