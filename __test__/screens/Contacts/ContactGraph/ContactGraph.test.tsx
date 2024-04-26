import React from "react"
import { act, fireEvent, render } from "@testing-library/react-native"
import ContactGraph from "../../../../screens/Contacts/ContactGraph/ContactGraph"

import { mockContacts } from "../../../../screens/Contacts/mockContacts"
import Graph from "../../../../components/Graph/Graph"

describe("ContactGraph", () => {
  const contacts = mockContacts
  const userId = "0"
  const graph = new Graph(contacts, userId)

  const mockFunc = jest.fn()

  beforeEach(() => {
    mockFunc.mockClear()
  })

  it("renders the screen", () => {
    const component = render(
      <ContactGraph
        onContactPress={() => mockFunc}
        graph={graph}
        userId={userId}
      />
    )
    expect(component).toBeTruthy()
  })

  it("search bar is reachable", () => {
    const component = render(
      <ContactGraph
        onContactPress={() => mockFunc}
        graph={graph}
        userId={userId}
      />
    )
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
      fireEvent.changeText(searchBar, "Isabelle")
    })

    expect(searchBar.props.value).toBe("Isabelle")

    act(() => {
      fireEvent(searchBar, "submitEditing")
    })
  })

  it("clicking a node opens a modal", () => {
    const component = render(
      <ContactGraph
        onContactPress={() => mockFunc}
        graph={graph}
        userId={userId}
      />
    )
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

    act(() => {
      fireEvent(node, "pressOut")
      jest.advanceTimersByTime(500)
    })

    jest.useRealTimers()

    const modal = component.getByTestId("modal")
    expect(modal).toBeTruthy()
  })

  it("clicking outside the modal closes it", () => {
    const component = render(
      <ContactGraph
        onContactPress={() => mockFunc}
        graph={graph}
        userId={userId}
      />
    )
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

    act(() => {
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
