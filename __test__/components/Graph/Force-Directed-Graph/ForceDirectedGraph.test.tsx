import React from "react"
import { render, act} from "@testing-library/react-native"
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
    graph = new Graph(["A", "B", "C"], ["A", "B"], ["B", "C"], [1, 2])
    constrainedNodeId = "someNodeId"
  })

  it("renders without crashing", () => {
    const component = render(
      <ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />
    )
    expect(component).toBeTruthy()
  })

  it('dragging moves the graph', () => {
    const component = render(<ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />)
    const panHandler = component.getByTestId('pan-handler')
    const nodeA = component.getByTestId("node-A")
    const nodeB = component.getByTestId("node-B")
    const nodeC = component.getByTestId("node-C")

    const initialX_A = nodeA.props.cx
    const initialY_A = nodeA.props.cy

    const initialX_B = nodeB.props.cx
    const initialY_B = nodeB.props.cy

    const initialX_C = nodeC.props.cx
    const initialY_C = nodeC.props.cy


    // Simulate a touch start event
    act(() => {
    panHandler.props.onGestureEvent({
      nativeEvent: { state: 'BEGIN', translationX: 0, translationY: 0 },
    })
    })

    // Simulate a touch move event
    act(() => {
    panHandler.props.onGestureEvent({
      nativeEvent: { state: 'ACTIVE', translationX: 10, translationY: 10 },
    })
  })

  expect(nodeA.props.cx).toBe(initialX_A + 10)
  expect(nodeA.props.cy).toBe(initialY_A + 10)

  expect(nodeB.props.cx).toBe(initialX_B + 10)
  expect(nodeB.props.cy).toBe(initialY_B + 10)

  expect(nodeC.props.cx).toBe(initialX_C + 10)
  expect(nodeC.props.cy).toBe(initialY_C + 10)

  expect(graph.getNodes()[0].x).toBe(initialX_A)
  expect(graph.getNodes()[0].y).toBe(initialY_A)

  expect(graph.getNodes()[1].x).toBe(initialX_B)
  expect(graph.getNodes()[1].y).toBe(initialY_B)

  expect(graph.getNodes()[2].x).toBe(initialX_C)
  expect(graph.getNodes()[2].y).toBe(initialY_C)

  act(() => {
    // Simulate a touch end event
    panHandler.props.onHandlerStateChange({
      nativeEvent: { state: 'END'},
    })
  })

  expect(nodeA.props.cx).toBe(initialX_A + 10)
  expect(nodeA.props.cy).toBe(initialY_A + 10)

  expect(nodeB.props.cx).toBe(initialX_B + 10)
  expect(nodeB.props.cy).toBe(initialY_B + 10)

  expect(nodeC.props.cx).toBe(initialX_C + 10)
  expect(nodeC.props.cy).toBe(initialY_C + 10)

  })
})
