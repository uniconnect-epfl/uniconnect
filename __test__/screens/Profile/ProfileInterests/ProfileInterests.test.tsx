import React from "react"
import { render } from "@testing-library/react-native"
import { ProfileInterests } from "../../../../screens/Profile/ProfileInterests/ProfileInterests"
import { User } from "../../../../types/User"

// Mock user data
const mockUser: User = {
  uid: "123",
  firstName: "John",
  lastName: "Doe",
  location: "New York",
  profilePicture: "https://example.com/profile.jpg",
  description: "Test user description",
  selectedInterests: ["Music", "Sports", "Art", "Travel"],
  email: "",
  friends: [],
  events: [],
  date: new Date(),
}

describe("ProfileInterests", () => {
  it("renders the user's interests correctly", () => {
    const { getByText } = render(<ProfileInterests user={mockUser} />)

    // Check if the interests are displayed
    expect(getByText("Music")).toBeTruthy()
    expect(getByText("Sports")).toBeTruthy()
    expect(getByText("Art")).toBeTruthy()
    expect(getByText("Travel")).toBeTruthy()
  })

  it("renders the correct number of interests", () => {
    const { getAllByText } = render(<ProfileInterests user={mockUser} />)

    // Check if the number of interests matches
    const interestElements = getAllByText(/Music|Sports|Art|Travel/)
    expect(interestElements.length).toBe(mockUser.selectedInterests.length)
  })
})
