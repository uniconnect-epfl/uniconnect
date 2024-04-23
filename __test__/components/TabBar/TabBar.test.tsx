import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { NavigationContainer } from '@react-navigation/native'
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"

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
    const component = render(
        <NavigationContainer>
          <HomeTabNavigator/>
        </NavigationContainer>
    )

    expect(component).toBeTruthy()
  })

  it("navigates to the selected tab on press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeTabNavigator/>
      </NavigationContainer>
    )

    const home = getByText("Home")
    const connections = getByText("Connections")
    const explore = getByText("Explore")

    fireEvent.press(connections)

    expect(getByText("Plain View")).toBeTruthy()

    fireEvent.press(home)

    expect(getByText("HomeScreen")).toBeTruthy()

    fireEvent.press(explore)

    expect(getByText("Plain View")).toBeTruthy()

  })
})
