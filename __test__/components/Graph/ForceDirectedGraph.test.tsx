import { render, waitFor } from "@testing-library/react-native"
import ForceDirectedGraph from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import { NavigationProp, ParamListBase } from "@react-navigation/native"

import Graph from "../../../components/Graph/Graph"
import { loginEmailPassword } from "../../../firebase/Login"
import React from "react"

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

describe("<ForceDirectedGraph />", () => {
  it("should render correctly", async () => {
    const component = render(
      <ForceDirectedGraph
        graph={graph}
        constrainedNodeId={"dFcpWnfaNTOWBFyJnoJSIL6xyi32"}
        magicNodeId={""}
        onModalPress={() => {}}
        onMagicPress={() => {}}
      />
    )

    await waitFor(() => {
      expect(component.getByTestId("svg-view")).toBeTruthy()
    })
  })
})
