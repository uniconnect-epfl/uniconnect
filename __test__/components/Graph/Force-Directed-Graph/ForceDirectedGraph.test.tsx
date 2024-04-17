import React from "react"
import { render, act, fireEvent, waitFor} from "@testing-library/react-native"
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

  it("renders without crashing", () => {
    const component = render(
      <ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />
    )
    expect(component).toBeTruthy()
  })

  it('dragging moves the graph', () => {
    const component = render(<ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />)
    const panHandler = component.getByTestId('pan-handler')
    const node1 = component.getByTestId("node-1")
    const node2 = component.getByTestId("node-2")
    const node3 = component.getByTestId("node-3")

    const initialX_A = node1.props.cx
    const initialY_A = node1.props.cy

    const initialX_B = node2.props.cx
    const initialY_B = node2.props.cy

    const initialX_C = node3.props.cx
    const initialY_C = node3.props.cy


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

  expect(node1.props.cx).toBe(initialX_A + 10)
  expect(node1.props.cy).toBe(initialY_A + 10)

  expect(node2.props.cx).toBe(initialX_B + 10)
  expect(node2.props.cy).toBe(initialY_B + 10)

  expect(node3.props.cx).toBe(initialX_C + 10)
  expect(node3.props.cy).toBe(initialY_C + 10)

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

  expect(node1.props.cx).toBe(initialX_A + 10)
  expect(node1.props.cy).toBe(initialY_A + 10)

  expect(node2.props.cx).toBe(initialX_B + 10)
  expect(node2.props.cy).toBe(initialY_B + 10)

  expect(node3.props.cx).toBe(initialX_C + 10)
  expect(node3.props.cy).toBe(initialY_C + 10)

  })

  it('clicking a node launches animation', async () => {
    const component = render(<ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />)
    const node1 = component.getByTestId("node-1")
    const panHandler = component.getByTestId('pan-handler')

    const initialX_A = node1.props.cx
    const initialY_A = node1.props.cy
    
    fireEvent.press(node1)
    await waitFor(() => {
      setTimeout(() => {
          expect(panHandler.props.enabled).toBe(false)
          const modal = component.getByTestId('modal')
          expect(modal).toBeTruthy()
          expect(modal.props.visible).toBe(true)
          expect(Math.abs(node1.props.cx - initialX_A)).toBeGreaterThan(0)
          expect(Math.abs(node1.props.cy - initialY_A)).toBeGreaterThan(0)
      }, 100)

    })
  
  await waitFor(() => {
    setTimeout(() => {
        expect(panHandler.props.enabled).toBe(true)
    }, 500)
})
})

 it('clicking on a node sets clickedNode', async () => {
    const component = render(<ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />)
    const node1 = component.getByTestId("node-1")
    fireEvent.press(node1)

    await waitFor(() => {
      setTimeout(() => {
          const modal = component.getByTestId('modal')
          expect(modal).toBeTruthy()
          expect(modal.props.key).toBe('node-1')
      }, 100)
    }
    )
    
  })
})
