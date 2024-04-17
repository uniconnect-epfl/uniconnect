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

jest.mock("react-native-gesture-handler", () => {
  // eslint-disable-next-line
  const View = require("react-native").View
  return {
    State: {
      END: 5,
    },
    PanGestureHandler: View,
    PinchGestureHandler: View,
    GestureHandlerRootView: View,
  }
})

describe("ForceDirectedGraph", () => {
  let graph: Graph
  let constrainedNodeId: string

  beforeEach(() => {
    graph = new Graph(["1", "2", "3"], ["1", "2"], ["2", "3"], [1, 2])
    constrainedNodeId = "2"
  })

  afterEach(() => {
    cleanup()
  })

  it("renders without crashing", () => {
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
      />,
    )
    expect(component).toBeTruthy()
  })

  it("dragging moves the graph", () => {
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
      />,
    )

    expect(component).toBeTruthy()

    const panHandler = component.getByTestId("pan-handler")
    const node1 = component.getByTestId("node-1")
    const node2 = component.getByTestId("node-2")
    const node3 = component.getByTestId("node-3")

    const initialX_A = node1.props.cx
    const initialY_A = node1.props.cy

    const initialX_B = node2.props.cx
    const initialY_B = node2.props.cy

    const initialX_C = node3.props.cx
    const initialY_C = node3.props.cy

    act(() => {
      panHandler.props.onGestureEvent({
        nativeEvent: { state: "BEGIN", translationX: 0, translationY: 0 },
      })
    })

    act(() => {
      panHandler.props.onGestureEvent({
        nativeEvent: { state: "ACTIVE", translationX: 10, translationY: 10 },
      })
    })

    expect(node1.props.cx).toBe(initialX_A + 10)
    expect(node1.props.cy).toBe(initialY_A + 10)

    expect(node2.props.cx).toBe(initialX_B + 10)
    expect(node2.props.cy).toBe(initialY_B + 10)

    expect(node3.props.cx).toBe(initialX_C + 10)
    expect(node3.props.cy).toBe(initialY_C + 10)

    act(() => {
      panHandler.props.onHandlerStateChange({
        nativeEvent: { state: "END" },
      })
    })

    expect(node1.props.cx).toBe(initialX_A + 10)
    expect(node1.props.cy).toBe(initialY_A + 10)

    expect(node2.props.cx).toBe(initialX_B + 10)
    expect(node2.props.cy).toBe(initialY_B + 10)

    expect(node3.props.cx).toBe(initialX_C + 10)
    expect(node3.props.cy).toBe(initialY_C + 10)
  })

  it("displays modal when a node is pressed", async () => {
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={constrainedNodeId}
      />,
    )


    const panHandler = component.getByTestId("pan-handler")
    const node1 = component.getByTestId("node-1")

    expect(node1).toBeTruthy()
    expect(panHandler).toBeTruthy()
    expect(panHandler.props.enabled).toBe(true)

    fireEvent(node1, "pressIn")

    jest.useFakeTimers()
    jest.advanceTimersByTime(50)
    fireEvent(node1, "pressOut")

    await waitFor(() => {
      const modal = component.getByTestId("modal")
      expect(modal).toBeTruthy()
      expect(modal.props.visible).toBe(true)
    }, {timeout: 10})

    jest.useRealTimers()    

    const quitModal = component.getByTestId("modal-touchable")
    expect(quitModal).toBeTruthy()
    fireEvent(quitModal, "press")

    jest.useFakeTimers()

    await waitFor(() => {
      expect(component.queryByTestId("modal")).toBeNull()
    }, {timeout: 10})

    jest.useRealTimers()
  })
})
