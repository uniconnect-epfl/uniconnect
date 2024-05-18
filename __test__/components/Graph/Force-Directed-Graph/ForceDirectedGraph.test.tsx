import React from "react"
import { cleanup, render, act, fireEvent } from "@testing-library/react-native"
import ForceDirectedGraph from "../../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import Graph from "../../../../components/Graph/Graph"
import { State } from "react-native-gesture-handler"

import { mockContacts } from "../../../../screens/Contacts/mockContacts"

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

describe("ForceDirectedGraph", () => {
  let contacts = mockContacts
  let constrainedNodeId = "0"
  let magicNodeId = ""
  let modalPressedOut = false
  const onModalPress = jest.fn()
  const onMagicPress = jest.fn()

  beforeEach(() => {
    contacts = mockContacts
    constrainedNodeId = "0"
    magicNodeId = ""
    modalPressedOut = false
    onModalPress.mockClear()
    onMagicPress.mockClear()
  })

  afterEach(() => {
    cleanup()
  })

  it("renders without crashing", () => {
    const graph = new Graph(contacts, constrainedNodeId)
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        magicNodeId={magicNodeId}
        modalPressedOut={modalPressedOut}
        onModalPress={onModalPress}
        onMagicPress={onMagicPress}
      />
    )
    expect(component).toBeTruthy()
  })

  it("dragging moves the graph", () => {
    const graph = new Graph(contacts, constrainedNodeId)
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        magicNodeId={magicNodeId}
        modalPressedOut={modalPressedOut}
        onModalPress={onModalPress}
        onMagicPress={onMagicPress}
      />
    )

    expect(component).toBeTruthy()

    const panHandler = component.getByTestId("pan-handler")

    act(() => {
      panHandler.props.onGestureEvent({
        nativeEvent: { translationX: 0, translationY: 0 },
      })
    })

    act(() => {
      panHandler.props.onGestureEvent({
        nativeEvent: { translationX: 10, translationY: 10 },
      })
    })

    act(() => {
      panHandler.props.onHandlerStateChange({
        nativeEvent: { state: State.END },
      })
    })
  })

  it("displays modal when a node is pressed", async () => {
    const graph = new Graph(contacts, constrainedNodeId)
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        magicNodeId={magicNodeId}
        modalPressedOut={modalPressedOut}
        onModalPress={onModalPress}
        onMagicPress={onMagicPress}
      />
    )

    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()

    act(() => {
      fireEvent(node1, "pressIn")
      fireEvent(node1, "pressIn")
    })

    expect(onModalPress).toHaveBeenCalled()
  })

  it("single pressing a node does not display a modal", async () => {
    const graph = new Graph(contacts, constrainedNodeId)

    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        magicNodeId={magicNodeId}
        modalPressedOut={modalPressedOut}
        onModalPress={onModalPress}
        onMagicPress={onMagicPress}
      />
    )

    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()

    act(() => {
      fireEvent(node1, "press")
    })
    expect(onModalPress).not.toHaveBeenCalled()
  })

  it("pinching zooms the graph", async () => {
    const graph = new Graph(contacts, constrainedNodeId)

    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        magicNodeId={magicNodeId}
        modalPressedOut={modalPressedOut}
        onModalPress={onModalPress}
        onMagicPress={onMagicPress}
      />
    )

    expect(component).toBeTruthy()

    const pinchHandler = component.getByTestId("pinch-handler")

    expect(pinchHandler).toBeTruthy()

    const text_1 = component.getByTestId("text-1")

    expect(text_1).toBeTruthy()

    const initialY = Number(text_1.props.y.toString())

    act(() => {
      pinchHandler.props.onGestureEvent({
        nativeEvent: { scale: 2 },
      })
    })

    expect(Number(text_1.props.y.toString())).toBeLessThan(initialY)
  })
})
