import { render, fireEvent, waitFor, act } from "@testing-library/react-native"
import { NavigationProp, ParamListBase } from "@react-navigation/native"

import Graph from "../../../../components/Graph/Graph"
import { loginEmailPassword } from "../..//../../firebase/Login"

import ContactGraph from "../../../../screens/Network/ContactGraph/ContactGraph"
import React from "react"

import * as ScreenOrientation from "expo-screen-orientation"
import GraphOptionsModal from "../../../../components/Graph/GraphOptionsModal/GraphOptionsModal"
import { View } from "react-native"
import { SimulationParameters } from "../../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"

jest.mock("@react-native-community/slider", () => {
  const MockSlider = jest.fn().mockImplementation(() => null)
  return MockSlider
})

// Mock the ScreenOrientation API
jest.mock("expo-screen-orientation", () => ({
  getOrientationAsync: jest.fn(),
  addOrientationChangeListener: jest.fn(),
  removeOrientationChangeListener: jest.fn(),
  Orientation: {
    PORTRAIT_UP: "PORTRAIT_UP",
    LANDSCAPE_LEFT: "LANDSCAPE_LEFT",
  },
  OrientationLock: {
    PORTRAIT_UP: "PORTRAIT_UP",
  },
  unlockAsync: jest.fn(),
  lockAsync: jest.fn(),
}))
jest.mock("d3-force", () => ({
  forceSimulation: jest.fn(() => ({
    force: jest.fn().mockReturnThis(),
    nodes: jest.fn().mockReturnThis(),
    links: jest.fn().mockReturnThis(),
    alpha: jest.fn().mockReturnThis(),
    restart: jest.fn(),
    stop: jest.fn(),
    on: jest.fn().mockReturnThis(),
  })),
  forceLink: jest.fn(() => ({
    id: jest.fn().mockReturnThis(),
    distance: jest.fn().mockReturnThis(),
  })),
  forceManyBody: jest.fn(() => ({
    strength: jest.fn().mockReturnThis(),
  })),
  forceCenter: jest.fn().mockReturnThis(),
  forceCollide: jest.fn().mockReturnThis(),
}))

jest.mock("react-native/Libraries/Image/Image", () => "Image")

// Mock AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}))

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
} as unknown as NavigationProp<ParamListBase>

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigation.navigate,
    }),
  }
})

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" })),
  getAuth: jest.fn(() => ({
    currentUser: { uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32" },
  })),
}))

const userContact = {
  uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
  firstName: "Gaspard",
  lastName: "Thoral",
  profilePictureUrl: "",
  description: "",
  location: "Paris",
  interests: ["Artificial Inteligence", "Blockchain"],
  events: [""],
  friends: ["wFz3KQa6lgUaT5dt7bLQHD59Loj1", "iImqL2GDCIYmHf41olukxgOhVQK2"],
}
const graph = new Graph(
  [
    {
      uid: "dFcpWnfaNTOWBFyJnoJSIL6xyi32",
      firstName: "Gaspard",
      lastName: "Thoral",
      profilePictureUrl: "",
      description: "",
      location: "Paris",
      interests: ["Artificial Inteligence", "Blockchain"],
      events: [""],
      friends: ["wFz3KQa6lgUaT5dt7bLQHD59Loj1", "iImqL2GDCIYmHf41olukxgOhVQK2"],
    },
    {
      uid: "wFz3KQa6lgUaT5dt7bLQHD59Loj1",
      firstName: "Gustave",
      lastName: "Charles",
      profilePictureUrl: "",
      description: "",
      location: "",
      interests: ["Baking desserts"],
      events: [""],
      friends: ["KJHSW1Jt7GYHKokD5RxIuwuBlzz1", "dFcpWnfaNTOWBFyJnoJSIL6xyi32"],
    },
    {
      uid: "iImqL2GDCIYmHf41olukxgOhVQK2",
      firstName: "pedropedr",
      lastName: "pedropedro",
      profilePictureUrl: "",
      description: "",
      location: "loc",
      interests: [
        "Writing",
        "Gardening",
        "Artificial Inteligence",
        "Baking desserts",
      ],
      events: [""],
      friends: ["dFcpWnfaNTOWBFyJnoJSIL6xyi32"],
    },
  ],
  "dFcpWnfaNTOWBFyJnoJSIL6xyi32"
)

beforeAll(async () => {
  global.alert = jest.fn()
  await loginEmailPassword("gasthoral@gmail.com", "Abcdefg123")
})

describe("<ContactGraph /> tests", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-extra-semi
    ;(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue(
      ScreenOrientation.Orientation.PORTRAIT_UP
    )
  })

  it("should display the nodes", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      expect(
        component.getByTestId("node-dFcpWnfaNTOWBFyJnoJSIL6xyi32")
      ).toBeTruthy()
    })
  })

  it("Clicking on Expand Icon and Contract Icon works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId={"dFcpWnfaNTOWBFyJnoJSIL6xyi32"}
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(
      async () => {
        const expandButton = await component.findByTestId("expand-button")
        expect(expandButton).toBeTruthy()
        fireEvent(expandButton, "press")
      },
      { timeout: 5000 }
    )

    await waitFor(
      async () => {
        const contractButton = await component.findByTestId("contract-button")
        expect(contractButton).toBeTruthy()
        fireEvent(contractButton, "press")
      },
      { timeout: 5000 }
    )
  }, 15000)

  it("Resets graph parameters correctly", async () => {
    const updateSimulationParameters = jest.fn()
    const simulationParameters: SimulationParameters = {
      distance: 100,
      charge: -200,
      collide: 20,
    }

    const component = render(
      <View>
        <GraphOptionsModal
          visible={true}
          updateSimulationParameters={updateSimulationParameters}
          initialParameters={simulationParameters}
        />
      </View>
    )

    await waitFor(() => {
      const resetButton = component.getByTestId("reset-parameters")
      expect(resetButton).toBeTruthy()
      fireEvent.press(resetButton)
    })
  })

  it("Double clicking a node displays a modal", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-dFcpWnfaNTOWBFyJnoJSIL6xyi32")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: 2, touchBank: [] },
        })
        fireEvent(node1, "responderRelease", {
          touchHistory: { mostRecentTimeStamp: 2, touchBank: [] },
        })
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: 3, touchBank: [] },
        })
        fireEvent(node1, "responderRelease", {
          touchHistory: { mostRecentTimeStamp: 3, touchBank: [] },
        })
      })
    })

    await waitFor(() => {
      const touchable = component.getByTestId("modal-touchable")
      expect(touchable).toBeTruthy()
      fireEvent.press(touchable)
    })
  })

  it("Long pressing the constrained node at first does not change anything", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-dFcpWnfaNTOWBFyJnoJSIL6xyi32")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }, 10000)

  it("Long pressing a friend node at first works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-iImqL2GDCIYmHf41olukxgOhVQK2")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }, 10000)

  it("Long pressing a friend node at first and then the constrained node works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-iImqL2GDCIYmHf41olukxgOhVQK2")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))

    await waitFor(() => {
      const node1 = component.getByTestId("node-dFcpWnfaNTOWBFyJnoJSIL6xyi32")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))
  }, 10000)

  it("Long pressing a friend node at first and back again works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-iImqL2GDCIYmHf41olukxgOhVQK2")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))

    await waitFor(() => {
      const node1 = component.getByTestId("node-iImqL2GDCIYmHf41olukxgOhVQK2")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))
  }, 10000)

  it("Long pressing a friend node at first and another friend again works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId="dFcpWnfaNTOWBFyJnoJSIL6xyi32"
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-iImqL2GDCIYmHf41olukxgOhVQK2")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))

    await waitFor(() => {
      const node1 = component.getByTestId("node-wFz3KQa6lgUaT5dt7bLQHD59Loj1")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))
  }, 10000)

  it("Dragging a node works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId={"dFcpWnfaNTOWBFyJnoJSIL6xyi32"}
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-iImqL2GDCIYmHf41olukxgOhVQK2")
      expect(node1).toBeTruthy()

      // Simulate PanResponder move event (drag)
      act(() => {
        fireEvent(node1, "responderMove", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })
  })

  it("Dragging the graph works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId={"dFcpWnfaNTOWBFyJnoJSIL6xyi32"}
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const view = component.getByTestId("force-directed-graph-view")
      expect(view).toBeTruthy()

      // Simulate PanResponder move event (drag)
      act(() => {
        fireEvent(view, "responderMove", {
          touchHistory: { mostRecentTimeStamp: "2", touchBank: [] },
        })
      })
    })
  })

  it("Adding a friend works", async () => {
    const component = render(
      <ContactGraph
        onContactPress={() => {}}
        graph={graph}
        userId={"dFcpWnfaNTOWBFyJnoJSIL6xyi32"}
        userContact={userContact}
        loaded={true}
      />
    )

    await waitFor(() => {
      const node1 = component.getByTestId("node-dFcpWnfaNTOWBFyJnoJSIL6xyi32")
      expect(node1).toBeTruthy()
      act(() => {
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: 2, touchBank: [] },
        })
        fireEvent(node1, "responderRelease", {
          touchHistory: { mostRecentTimeStamp: 2, touchBank: [] },
        })
        fireEvent(node1, "responderGrant", {
          touchHistory: { mostRecentTimeStamp: 3, touchBank: [] },
        })
        fireEvent(node1, "responderRelease", {
          touchHistory: { mostRecentTimeStamp: 3, touchBank: [] },
        })
      })
    })

    await waitFor(() => {
      const touchable = component.getByTestId("modal-touchable-contact")
      expect(touchable).toBeTruthy()
      fireEvent.press(touchable)
    })
  })
})
