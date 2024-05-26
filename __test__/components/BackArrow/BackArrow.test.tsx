import React from "react"
import { render } from "@testing-library/react-native"
import { BackArrow } from "../../../components/BackArrow/BackArrow"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

const mockGoBack = jest.fn()

jest.mock("@react-navigation/native", () => {
    return {
      ...jest.requireActual("@react-navigation/native"),
      useNavigation: () => ({
        goBack: mockGoBack,
      }),
    }
})

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe("BackArrow", () => {
  it("renders the screen", () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
            <BackArrow />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    expect(component).toBeTruthy()
  })
})
