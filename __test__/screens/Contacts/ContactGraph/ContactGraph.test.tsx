import React from "react"
import { act, fireEvent, render } from "@testing-library/react-native"
import ContactGraph from "../../../../screens/Contacts/ContactGraph/ContactGraph"

describe("ContactGraph", () => {
  
  const mockFunc = jest.fn()

    beforeEach(() => {
        mockFunc.mockClear()
    })

    it("renders the screen", () => {
        const component = render(<ContactGraph onContactPress={() => mockFunc} />)
        expect(component).toBeTruthy()
    })

    it("search bar is reachable", () => {
        const component = render(<ContactGraph onContactPress={() => mockFunc} />)
        expect(component).toBeTruthy()

        const searchBar = component.getByPlaceholderText("Search...")
        expect(searchBar).toBeTruthy()

        act(() => {
        fireEvent(searchBar, "press")
        })

        act(() => {
        fireEvent.changeText(searchBar, "Machine Learning")
        })

        expect(searchBar.props.value).toBe("Machine Learning")
    })
  
})