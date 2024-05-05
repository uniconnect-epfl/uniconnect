import React from "react"
import { render } from "@testing-library/react-native"
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture"

describe("ProfilePicture", () => {
  
  it("renders correctly", () => {
    const component = render(
        <ProfilePicture
            size={50}
            pictureUrl=""
        />)
    expect(component).toBeTruthy()
  })
  
})