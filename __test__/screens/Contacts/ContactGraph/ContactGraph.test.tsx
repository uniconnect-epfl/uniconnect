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
        fireEvent.changeText(searchBar, "")
        })

        expect(searchBar.props.value).toBe("")

        act(() => {
        fireEvent.changeText(searchBar, "0")
        })

        expect(searchBar.props.value).toBe("0")

        act (() => {
        fireEvent(searchBar, "submitEditing")
        })
    })

    it("clicking a node opens a modal", () => {
        const component = render(<ContactGraph onContactPress={() => mockFunc} />)
        expect(component).toBeTruthy()

        const node = component.getByTestId("node-0")
        expect(node).toBeTruthy()

        act(() => {
            fireEvent(node, "pressIn")
            })
        
            jest.useFakeTimers()
            act(() => {
            jest.advanceTimersByTime(50)
            })
        
            act (() => {
              fireEvent(node, "pressOut")
              jest.advanceTimersByTime(500)
            })
        
            
            jest.useRealTimers()  

        const modal = component.getByTestId("modal")
        expect(modal).toBeTruthy()
    })
  
    it("clicking outside the modal closes it", () => {
        const component = render(<ContactGraph onContactPress={() => mockFunc} />)
        expect(component).toBeTruthy()

        const node = component.getByTestId("node-0")
        expect(node).toBeTruthy()

        act(() => {
            fireEvent(node, "pressIn")
            })
        
            jest.useFakeTimers()
            act(() => {
            jest.advanceTimersByTime(50)
            })
        
            act (() => {
              fireEvent(node, "pressOut")
              jest.advanceTimersByTime(500)
            })
        
            
            jest.useRealTimers()  

        const modal = component.getByTestId("modal")
        expect(modal).toBeTruthy()

        const modalTouchable = component.getByTestId("modal-touchable")
        expect(modalTouchable).toBeTruthy()

        act(() => {
            fireEvent(modalTouchable, "press")
            })

        expect(component.queryByTestId("modal")).toBeNull()
    })

})