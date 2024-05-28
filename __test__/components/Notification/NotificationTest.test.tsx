import React from "react"
import { render } from "@testing-library/react-native"
import Notification, {
  NotificationProps,
} from "../../../components/Notification/Notification"

describe("Notification", () => {
  it("renders correctly with a profile image", () => {
    const props: NotificationProps = {
      id: "1",
      name: "John Doe",
      profileImage: "https://example.com/profile.jpg",
    }

    const { getByText, getByTestId } = render(<Notification {...props} />)

    // Check that the name and message text are rendered
    expect(getByText("John Doe")).toBeTruthy()
    expect(getByText("Added you as a friend")).toBeTruthy()

    // Check that the profile image is rendered
    const image = getByTestId("image")
    expect(image.props.source.uri).toBe("https://example.com/profile.jpg")
  })

  it("renders correctly without a profile image", () => {
    const props: NotificationProps = {
      id: "2",
      name: "Jane Doe",
    }

    const { getByText, getByTestId, queryByRole } = render(
      <Notification {...props} />
    )

    // Check that the name and message text are rendered
    expect(getByText("Jane Doe")).toBeTruthy()
    expect(getByText("Added you as a friend")).toBeTruthy()

    // Check that the profile image is not rendered
    const image = queryByRole("image")
    expect(image).toBeNull()

    // Check that the placeholder circle is rendered
    const placeholder = getByTestId("placeholder")
    expect(placeholder).toBeTruthy()
  })
})
