import React from "react"
import {
  cleanup,
  render,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react-native"
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

  const mockFunc = jest.fn()

  beforeEach(() => {
    contacts = mockContacts
    constrainedNodeId = "0"
    mockFunc.mockClear()
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
        onModalPress={mockFunc}
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
        onModalPress={mockFunc}
      />
    )

    expect(component).toBeTruthy()

    const panHandler = component.getByTestId("pan-handler")
    const node1 = component.getByTestId("node-1")
    const node2 = component.getByTestId("node-2")
    const node3 = component.getByTestId("node-3")

    const initialX_A = node1.props.x
    const initialY_A = node1.props.y

    const initialX_B = node2.props.x
    const initialY_B = node2.props.y

    const initialX_C = node3.props.x
    const initialY_C = node3.props.y

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

    expect(node1.props.x).toBe(initialX_A + 10)
    expect(node1.props.y).toBe(initialY_A + 10)

    expect(node2.props.x).toBe(initialX_B + 10)

    expect(node2.props.y).toBe(initialY_B + 10)

    expect(node3.props.x).toBe(initialX_C + 10)
    expect(node3.props.y).toBe(initialY_C + 10)

    act(() => {
      panHandler.props.onHandlerStateChange({
        nativeEvent: { state: State.END },
      })
    })

    expect(node1.props.x).toBe(initialX_A + 10)
    expect(node1.props.y).toBe(initialY_A + 10)

    expect(node2.props.x).toBe(initialX_B + 10)
    expect(node2.props.y).toBe(initialY_B + 10)

    expect(node3.props.x).toBe(initialX_C + 10)
    expect(node3.props.y).toBe(initialY_C + 10)
  })

  it("displays modal when a node is pressed", async () => {
    const graph = new Graph(contacts, constrainedNodeId)
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        onModalPress={mockFunc}
      />
    )

    const panHandler = component.getByTestId("pan-handler")
    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()
    expect(panHandler).toBeTruthy()
    expect(panHandler.props.enabled).toBe(true)

    act(() => {
      fireEvent(node1, "pressIn")
    })

    jest.useFakeTimers()
    act(() => {
      jest.advanceTimersByTime(50)
    })

    act(() => {
      fireEvent(node1, "pressOut")
      jest.advanceTimersByTime(500)
    })

    jest.useRealTimers()
    expect(mockFunc).toHaveBeenCalled()
  })

  it("very short pressing a node does not display a modal", async () => {
    const graph = new Graph(contacts, constrainedNodeId)

    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        onModalPress={mockFunc}
      />
    )

    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()
    expect(component.queryByTestId("modal")).toBeNull()

    fireEvent(node1, "pressIn")
    fireEvent(node1, "pressOut")
    jest.useFakeTimers()
    await waitFor(
      () => {
        expect(component.queryByTestId("modal")).toBeNull()
      },
      { timeout: 10 }
    )
    jest.useRealTimers()
  })

  it("long pressing a node does not display a modal", async () => {
    const graph = new Graph(contacts, constrainedNodeId)

    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        onModalPress={mockFunc}
      />
    )

    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()
    expect(mockFunc).not.toHaveBeenCalled()
  })

  it("pinching zooms the graph", async () => {
    const graph = new Graph(contacts, constrainedNodeId)

    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
        onModalPress={mockFunc}
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
