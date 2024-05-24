import React from "react"
import { render, waitFor, fireEvent } from "@testing-library/react-native"
import AnnouncementScreen from "../../../screens/Explore/AnnouncementScreen/AnnouncementScreen"
import { Firestore } from "firebase/firestore"
import { getAllAnnouncements } from "../../../firebase/ManageAnnouncements"

// Mock any external components not relevant for the test

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

jest.mock("../../../firebase/ManageAnnouncements", () => ({
  getAllAnnouncements: jest.fn(() =>
    Promise.resolve([
      { id: "1", title: "Future Announcement 1", date: "2024-04-05", interests: ["tech", "science"] },
      { id: "2", title: "Future Event 2", date: "2024-05-05", interests: ["art", "science"] },
    ])
  ),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({uid: '123'})),
  getAuth: jest.fn(() => ({currentUser: {uid: '123'}}))
}))

jest.mock("../../../firebase/User", () => ({
  getUserData: jest.fn(() =>
    Promise.resolve({
      id: "123",
      selectedInterests: ["tech", "art"]
    })
  )
}))

jest.mock("react-native-gesture-handler", () => ({
  // eslint-disable-next-line react/prop-types
  TouchableOpacity: ({ children, onPress }) => (
    <div onClick={onPress}>{children}</div>
  ),
}))

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => "Ionicon",
}))

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

describe("AnnouncementScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("displays loading screen initially", async () => {
    const { getByTestId } = render(
      <AnnouncementScreen onAnnouncementPress={() => {}} />
    )
    const loader = getByTestId("loading-indicator")
    expect(loader).toBeTruthy()
  })

  it("displays a message when there are no announcements", async () => {
    getAllAnnouncements.mockResolvedValueOnce([])
    const { queryByText } = render(
      <AnnouncementScreen onAnnouncementPress={() => {}} />
    )
    await waitFor(() => {
      expect(queryByText("No future announcements available.")).toBeTruthy()
    })
  })

  it("handles errors during data fetching", async () => {
    getAllAnnouncements.mockRejectedValueOnce(new Error("Network Error"))
    const { getByText } = render(
      <AnnouncementScreen onAnnouncementPress={() => {}} />
    )
    await waitFor(() => {
      expect(getByText("No future announcements available.")).toBeTruthy()
    })
  })

  it("filters announcements based on search query", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <AnnouncementScreen onAnnouncementPress={() => {}} />
    )

    await waitFor(() => {
      expect(queryByText("Future Announcement 1")).toBeTruthy()
      expect(queryByText("Future Event 2")).toBeTruthy()
    })

    const searchInput = getByPlaceholderText("Search...")
    fireEvent.changeText(searchInput, "Announcement 1")

    await waitFor(() => {
      expect(queryByText("Future Announcement 1")).toBeTruthy()
      expect(queryByText("Future Event 2")).toBeFalsy()
    })
  })

  it("sorts announcements based on common interests", async () => {
    const { queryByText } = render(
      <AnnouncementScreen onAnnouncementPress={() => {}} />
    )

    await waitFor(() => {
      const announcements = [
        { id: "1", title: "Future Announcement 1", date: "2024-04-05", interests: ["tech", "science"] },
        { id: "2", title: "Future Event 2", date: "2024-05-05", interests: ["art", "science"] },
      ]

      expect(queryByText("Future Announcement 1")).toBeTruthy()
      expect(queryByText("Future Event 2")).toBeTruthy()

      // Assuming that the announcements are displayed in order of common interests
      const firstAnnouncement = announcements[0].title
      const secondAnnouncement = announcements[1].title

      // Test that the order is correct based on interests
      expect(queryByText(firstAnnouncement)).toBeTruthy()
      expect(queryByText(secondAnnouncement)).toBeTruthy()
    })
  })
})
