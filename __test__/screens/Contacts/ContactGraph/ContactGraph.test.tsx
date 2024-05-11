import React from "react"
import { act, fireEvent, render, waitFor } from "@testing-library/react-native"
import ContactGraph from "../../../../screens/Contacts/ContactGraph/ContactGraph"

import { mockContacts } from "../../../../screens/Contacts/mockContacts"
import Graph from "../../../../components/Graph/Graph"

jest.mock("react-native-gesture-handler", () => {
  return {
    State: {
      END: 5,
    },
    PanGestureHandler: "View",
    PinchGestureHandler: "View",
    GestureHandlerRootView: "View",
  }
})

describe("ContactGraph", () => {
  const contacts = mockContacts
  const userId = "0"
  const magicUserId = ""
  const graph = new Graph(contacts, userId)
  const onContactPress = jest.fn()
  const onMagicPress = jest.fn()

  beforeEach(() => {
    onContactPress.mockClear()
    onMagicPress.mockClear()
  })

  it("renders the screen", () => {
    const component = render(
      <ContactGraph
        onContactPress={onContactPress}
        onMagicPress={onMagicPress}
        graph={graph}
        userId={userId}
        magicUserId={magicUserId}
      />
    )
    expect(component).toBeTruthy()
  })

  it("search bar is reachable", () => {
    const component = render(
      <ContactGraph
        onContactPress={() => onContactPress}
        onMagicPress={() => onMagicPress}
        graph={graph}
        userId={userId}
        magicUserId={magicUserId}
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

  it("modal is reachable", () => {
    const component = render(
      <ContactGraph
        onContactPress={() => onContactPress}
        onMagicPress={() => onMagicPress}
        graph={graph}
        userId={userId}
        magicUserId={magicUserId}
      />
    )
    expect(component).toBeTruthy()

    const node1 = component.getByTestId("node-1")
    expect(node1).toBeTruthy()

    act(() => {
      fireEvent(node1, "pressIn")
      fireEvent(node1, "pressIn")
    })

    const modal = component.getByTestId("modal")
    expect(modal).toBeTruthy()

    const modalPressOut = component.getByTestId("modal-touchable")
    expect(modalPressOut).toBeTruthy()

    act(() => {
      fireEvent(modalPressOut, "press")
    })

    expect(component.queryByTestId("modal")).toBeNull()
  })

  it("magic press", async () => {
    const component = render(
      <ContactGraph
        onContactPress={onContactPress}
        onMagicPress={onMagicPress}
        graph={graph}
        userId={userId}
        magicUserId={magicUserId}
      />
    )
    expect(component).toBeTruthy()

    const node1 = component.getByTestId("node-1")
    expect(node1).toBeTruthy()

    act(() => {
      fireEvent(node1, "longPress")
    })

    await waitFor(
      async () => {
        await expect(onMagicPress).toHaveBeenCalled()
      },
      { timeout: 2000 }
    )
  })
})
