import React from "react"
import { render } from "@testing-library/react-native"
import ViewAnnoucementScreen from "../../../../screens/ViewDetails/ViewAnnouncementScreen/ViewAnnouncementScreen"

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
      ...actualNav,
      useRoute: () => ({
        params: { uid: "123" },
      }),
    }
})

describe("ViewAnnouncementScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<ViewAnnoucementScreen />)
    expect(component).toBeTruthy()
  })
  
})