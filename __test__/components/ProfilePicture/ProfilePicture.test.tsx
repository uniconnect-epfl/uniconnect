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

  it("renders image", () => {
    const component = render(
        <ProfilePicture
            size={50}
            pictureUrl="../../../assets/icon.png"
        />)
    expect(component).toBeTruthy()
  })
  
})