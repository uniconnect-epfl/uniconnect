import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import NotificationsScreen from "../../../../screens/Settings/NotificationsScreen/NotificationsScreen"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

const mockGoBack = jest.fn()

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 10, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})

describe("NotificationsScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <NotificationsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    // Check that the header text is rendered
    expect(getByText("Notifications")).toBeTruthy()

    // Check that the search input is rendered
    expect(getByPlaceholderText("Search...")).toBeTruthy()
  })

  it("renders a list of notifications", () => {
    const { getByTestId, getAllByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <NotificationsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    // Check that the correct number of Notification components are rendered
    const flatList = getByTestId("notifications-flatlist")
    expect(flatList.props.data.length).toBe(2)

    // Check that both notification names are rendered
    expect(getAllByText(/Jean Dujardin|Pierre Ninet/).length).toBe(2)
  })

  it("filters notifications based on search input", () => {
    const { getByPlaceholderText, getAllByText, queryByText } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <NotificationsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )
    const searchInput = getByPlaceholderText("Search...")

    // Simulate typing into the search input
    fireEvent.changeText(searchInput, "Jean")

    // Check that only the filtered notification is rendered
    expect(getAllByText("Jean Dujardin").length).toBe(1)
    expect(queryByText("Pierre Ninet")).toBeNull()
  })

  test("navigates back when back button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SafeAreaProvider>
          <NotificationsScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    )

    const backButton = getByTestId("back-arrow")
    fireEvent.press(backButton)

    expect(mockGoBack).toHaveBeenCalled()
  })
})
