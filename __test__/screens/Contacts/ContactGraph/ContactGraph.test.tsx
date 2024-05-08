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
})
