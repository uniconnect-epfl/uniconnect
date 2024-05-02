
import { render, fireEvent } from '@testing-library/react-native'
import HomeScreen from '../../../screens/Home/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { Firestore } from 'firebase/firestore'


jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

const mockNavigation = {
  navigate: jest.fn(),
} 

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'), // keep all the original implementations
    useNavigation: () => mockNavigation,
  }
})

describe('HomeScreen', () => {

    it('renders the Home screen', () => {
        const component = render(
        <SafeAreaProvider>
          <HomeScreen/>
        </SafeAreaProvider>
        )
        expect(component).toBeTruthy()
    })

    // it('filters events based on search input', () => {
    //     const { getByText, getByPlaceholderText, queryByText } = render(
    //       <SafeAreaProvider>
    //         <HomeScreen />
    //       </SafeAreaProvider>
    //     )

    //     fireEvent.changeText(getByPlaceholderText('Search...'), 'Balelek')
    //     expect(getByText('Balelek 2023')).toBeTruthy()
    //     expect(queryByText('Event 2')).toBeNull()
    //     expect(queryByText('')).toBeNull()
    //     expect(queryByText('Abc')).toBeNull()

    //     fireEvent.changeText(getByPlaceholderText('Search...'), '')
    //     expect(getByText('Event 2')).toBeTruthy()
    // })
    
    // it('displays correct event details', () => {
    //     const { getByText } = render(
    //       <SafeAreaProvider>
    //         <HomeScreen />
    //       </SafeAreaProvider>
    //     )
    //     expect(getByText('Balelek 2023')).toBeTruthy()
    //     expect(getByText('2023-04-04')).toBeTruthy()
    // })

    it('keyboard disapear if we click aside', () => {
        const { getByPlaceholderText } = render(
          <SafeAreaProvider>
            <HomeScreen />
          </SafeAreaProvider>
        )
        fireEvent.press(getByPlaceholderText('Search...'))
        expect(getByPlaceholderText('Search...')).toBeTruthy()
    })


})




