import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import SectionTabs from "../../../components/SectionTabs/SectionTabs"

describe("SectionTabs", () => {
    const tabs = ["Option 1", "Option 2", "Option 3"]

    it("should render correctly with the initial choice", () => {
        const { getByText } = render(<SectionTabs tabs={tabs} startingTab="Option 2" barWidth={80} onTabChange={() => {}}/>)
        expect(getByText("Option 2")).toBeTruthy()
    })

    it("should call onTabChange when a choice is pressed", () => {
        const onTabChangeMock = jest.fn()
        const { getByText } = render(<SectionTabs tabs={tabs} startingTab="Option 1" onTabChange={onTabChangeMock} barWidth={80} />)

        const optionToPress = getByText("Option 2")
        fireEvent.press(optionToPress)

        expect(onTabChangeMock).toHaveBeenCalledWith("Option 2")
        expect(onTabChangeMock).toHaveBeenCalledTimes(1)
    })

    it("should update the selected choice visually when a different choice is pressed", () => {
        const { getByText, rerender } = render(<SectionTabs tabs={tabs} startingTab="Option 1" barWidth={80} onTabChange={() => {}} />)

        const optionToPress = getByText("Option 3")
        fireEvent.press(optionToPress)

        rerender(<SectionTabs tabs={tabs} startingTab="Option 3" barWidth={80} onTabChange={() => {}} />)
    })
})
