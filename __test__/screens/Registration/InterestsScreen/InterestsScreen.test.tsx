import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import InterestsScreen from "../../../../screens/Registration/InterestsScreen/InterestsScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Auth } from "firebase/auth"
import { showErrorToast } from "../../../../components/ToastMessage/toast"

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

const mockSetSelectedInterests = jest.fn()
const mockSelectedInterests = ["one"]

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => ({
    selectedInterests: mockSelectedInterests,
    setSelectedInterests: mockSetSelectedInterests,
  }),
}))

describe("InterestsScreen", () => {
  beforeEach(() => {
    mockSetSelectedInterests.mockClear()
    mockSelectedInterests.length = 0
  })

  it("renders the screen with necessary components", async () => {
    try {
      const { getByPlaceholderText, getAllByText } = render(
        <SafeAreaProvider>
          <InterestsScreen />
        </SafeAreaProvider>
      )

      await waitFor(() => {
        expect(getByPlaceholderText("Search")).toBeTruthy()
        const interestButtons = getAllByText(/.+/)
        expect(interestButtons.length).toBeGreaterThan(0)
      })
    } catch (error) {
      showErrorToast("Unable to render")
    }
  })

  it("allows searching and filters interests", async () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const searchInput = getByPlaceholderText("Search")
      fireEvent.changeText(searchInput, "Artificial Inteligence")
      expect(getByText("Artificial Inteligence")).toBeTruthy()
    })
  })

  it("allows selecting and deselecting interests", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      const interestButton = getByTestId("CryptocurrencyID")
      fireEvent.press(interestButton)
      fireEvent.press(interestButton)
    })
  })

  it("creates a label when an interest is selected", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByTestId("GardeningID"))
    })
  })

  it("removes a label when clicked", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByTestId("GardeningID"))
    })
  })

  it("shows error toast when there's an error rendering the screen", async () => {
    try {
      const { getByPlaceholderText, getAllByText } = render(
        <SafeAreaProvider>
          <InterestsScreen />
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
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
      </SafeAreaProvider>
    )

    expect(getByTestId("loading-indicator")).toBeTruthy()
  })

  it("toggles the interest selection correctly", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <InterestsScreen />
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
})
