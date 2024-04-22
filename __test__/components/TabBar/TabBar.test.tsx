import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

describe("TabBar", () => {

  it("renders the TabBar correctly", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <HomeTabNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
    )

    expect(getByText("Home")).toBeTruthy()
    expect(getByText("Connections")).toBeTruthy()
    expect(getByText("Explore")).toBeTruthy()
  })

  it("navigates to the selected tab on press", () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <HomeTabNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const home = getByText("Home")
    const connections = getByText("Connections")
    const explore = getByText("Explore")

    fireEvent.press(connections)

    expect(mockNavigate).toHaveBeenCalledWith({
      name: "Connections",
      params: {},
      merge: true,
    })

    fireEvent.press(home)

    expect(mockNavigate).toHaveBeenCalledWith({
      name: "Home",
      params: {},
      merge: true,
    })

    fireEvent.press(explore)

    expect(mockNavigate).toHaveBeenCalledWith({
      name: "Explore",
      params: {},
      merge: true,
    })

  })
})
