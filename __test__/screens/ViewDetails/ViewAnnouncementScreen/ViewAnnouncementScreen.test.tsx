import React from "react"
import { render } from "@testing-library/react-native"
import ViewAnnoucementScreen from "../../../../screens/ViewDetails/ViewAnnouncementScreen/ViewAnnouncementScreen"

describe("ViewAnnouncementScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<ViewAnnoucementScreen />)
    expect(component).toBeTruthy()
  })
  
})