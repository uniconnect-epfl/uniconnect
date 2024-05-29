import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import ExternalProfileScreen from "../../../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen"
import { getUserData, addFriend, removeFriend } from "../../../../firebase/User"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

jest.mock("d3-force", () => ({
  forceSimulation: jest.fn(() => ({
    force: jest.fn().mockReturnThis(),
    nodes: jest.fn().mockReturnThis(),
    links: jest.fn().mockReturnThis(),
    alpha: jest.fn().mockReturnThis(),
    restart: jest.fn(),
    stop: jest.fn(),
    on: jest.fn().mockReturnThis(),
  })),
  forceLink: jest.fn(() => ({
    id: jest.fn().mockReturnThis(),
    distance: jest.fn().mockReturnThis(),
  })),
  forceManyBody: jest.fn(() => ({
    strength: jest.fn().mockReturnThis(),
  })),
  forceCenter: jest.fn().mockReturnThis(),
  forceCollide: jest.fn().mockReturnThis(),
}))

jest.mock("../../../../firebase/User", () => ({
  getUserData: jest.fn().mockResolvedValue({
    uid: "1",
    firstName: "John",
    lastName: "Doe",
    location: "Sample City",
    description: "Sample Description",
    selectedInterests: ["Sample Interest"],
    date: new Date().toISOString(),
  }),
}))

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      externalUserUid: "1",
    },
  }),
}))

jest.mock(
  "../../../../components/GeneralProfile/GeneralProfile",
  () => "GeneralProfile"
)
jest.mock(
  "../../../../components/ExpandableDescription/ExpandableDescription",
  () => "ExpandableDescription"
)
jest.mock("../../../../components/InputField/InputField", () => "InputField")
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons")

//mock an alert with jest
global.alert = jest.fn()

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))
jest.mock("../../../../firebase/User", () => ({
  getUserData: jest.fn(),
  addFriend: jest.fn(),
  removeFriend: jest.fn(),
}))

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe("ExternalProfileScreen", () => {
  beforeAll(() => {
    global.alert = jest.fn()
  })

  beforeEach(() => {
      (getUserData as jest.Mock).mockClear()
  })
  beforeEach(() => {
      (addFriend as jest.Mock).mockClear()
  })
  beforeEach(() => {
      (removeFriend as jest.Mock).mockClear()
  })

  it("renders correctly when users are friends", async () => {
      (getUserData as jest.Mock).mockImplementation((uid) => {
      const fixedDate = "2024-05-15T16:42:52.269Z"
      if (uid === "123") {
        return Promise.resolve({
          uid: "123",
          firstName: "Current",
          lastName: "User",
          location: "Current City",
          description: "Current Description",
          friends: ["1"], // Ensure the external user is in the friends list
          selectedInterests: ["Current Interest"],
          date: fixedDate,
        })
      }
      return Promise.resolve({
        uid: "1",
        firstName: "John",
        lastName: "Doe",
        location: "Sample City",
        description: "Sample Description",
        friends: [],
        selectedInterests: ["Sample Interest"],
        date: fixedDate,
      })
    })

    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExternalProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByText("Network"))
      expect(getByText("Message")).toBeTruthy()
      expect(getByText("Remove")).toBeTruthy()
    })
  })

  it("renders correctly when users are not friends", async () => {
      (getUserData as jest.Mock).mockImplementation((uid) => {
      const fixedDate = "2024-05-15T16:42:52.269Z"
      if (uid === "123") {
        return Promise.resolve({
          uid: "123",
          firstName: "Current",
          lastName: "User",
          location: "Current City",
          description: "Current Description",
          friends: [], // Ensure the external user is not in the friends list
          selectedInterests: ["Current Interest"],
          date: fixedDate,
        })
      }
      return Promise.resolve({
        uid: "1",
        firstName: "John",
        lastName: "Doe",
        location: "Sample City",
        description: "Sample Description",
        friends: [],
        selectedInterests: ["Sample Interest"],
        date: fixedDate,
      })
    })

    const { getByTestId } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExternalProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      expect(getByTestId("addbutton")).toBeTruthy()
    })
  })
  it("changes tabs correctly", async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExternalProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      fireEvent.press(getByText("Interests"))
      fireEvent.press(getByText("Events"))
    })
  })

  it("handles adding friend", async () => {
      (getUserData as jest.Mock).mockImplementation((uid) => {
      const fixedDate = "2024-05-15T16:42:52.269Z"
      if (uid === "123") {
        return Promise.resolve({
          uid: "123",
          firstName: "Current",
          lastName: "User",
          location: "Current City",
          description: "Current Description",
          friends: [], // Ensure the external user is not in the friends list
          selectedInterests: ["Current Interest"],
          date: fixedDate,
        })
      }
      return Promise.resolve({
        uid: "1",
        firstName: "John",
        lastName: "Doe",
        location: "Sample City",
        description: "Sample Description",
        friends: [],
        selectedInterests: ["Sample Interest"],
        date: fixedDate,
      })
    })

    const { getByTestId } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExternalProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      expect(getByTestId("addbutton")).toBeTruthy() // Ensure the "Add" button is present
    })

    fireEvent.press(getByTestId("addbutton"))

    await waitFor(() => {
      expect(addFriend).toHaveBeenCalledWith(
        {
          uid: "123",
          firstName: "Current",
          lastName: "User",
          location: "Current City",
          description: "Current Description",
          friends: [], // Ensure the mock data matches
          selectedInterests: ["Current Interest"],
          date: "2024-05-15T16:42:52.269Z",
        },
        {
          uid: "1",
          firstName: "John",
          lastName: "Doe",
          location: "Sample City",
          description: "Sample Description",
          friends: [],
          selectedInterests: ["Sample Interest"],
          date: "2024-05-15T16:42:52.269Z",
        }
      )
    })
  })

  it("handles removing friend", async () => {
    (getUserData as jest.Mock).mockImplementation((uid) => {
      const fixedDate = "2024-05-15T16:42:52.269Z"
      if (uid === "123") {
        return Promise.resolve({
          uid: "123",
          firstName: "Current",
          lastName: "User",
          location: "Current City",
          description: "Current Description",
          friends: ["1"], // Ensure the external user is in the friends list
          selectedInterests: ["Current Interest"],
          date: fixedDate,
        })
      }
      return Promise.resolve({
        uid: "1",
        firstName: "John",
        lastName: "Doe",
        location: "Sample City",
        description: "Sample Description",
        friends: [],
        selectedInterests: ["Sample Interest"],
        date: fixedDate,
      })
    })

    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ExternalProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    await waitFor(() => {
      expect(getByText("Remove")).toBeTruthy() // Ensure the "Remove" button is present
    })

    fireEvent.press(getByText("Remove"))

    await waitFor(() => {
      expect(removeFriend).toHaveBeenCalledWith(
        {
          uid: "123",
          firstName: "Current",
          lastName: "User",
          location: "Current City",
          description: "Current Description",
          friends: ["1"], // Ensure the mock data matches
          selectedInterests: ["Current Interest"],
          date: "2024-05-15T16:42:52.269Z",
        },
        {
          uid: "1",
          firstName: "John",
          lastName: "Doe",
          location: "Sample City",
          description: "Sample Description",
          friends: [],
          selectedInterests: ["Sample Interest"],
          date: "2024-05-15T16:42:52.269Z",
        }
      )
    })
  })
})
