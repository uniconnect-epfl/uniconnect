
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import HomeScreen from '../../../screens/Home/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { Firestore } from 'firebase/firestore'
import { NavigationProp, ParamListBase } from '@react-navigation/native'


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


jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'), // keep all the original implementations
    useNavigation: () => mockNavigation,
  }
})

jest.mock('../../../firebase/ManageEvents', () => ({
  getAllFutureEvents: jest.fn(() => Promise.resolve([
    { id: '1', title: 'Future Event 1', date: '2024-01-01' },
    { id: '2', title: 'Future Event 2', date: '2024-01-02' },
    { id: '3', title: 'Future Event 3', date: '2024-01-03' }
  ])),
  getAllPastEvents: jest.fn(() => Promise.resolve([
    { id: '3', title: 'Past Event 1', date: '2022-01-01' },
    { id: '4', title: 'Past Event 2', date: '2022-01-02' }
  ]))
}))


describe('HomeScreen', () => {

    it('renders the Home screen', () => {
        const component = render(
        <SafeAreaProvider>
          <HomeScreen navigation={mockNavigation}/>
        </SafeAreaProvider>
        )
        expect(component).toBeTruthy()
    })

    it('filters events based on search input', async () => {
        const {getByText ,getAllByText, getByPlaceholderText } = render(
          <SafeAreaProvider>
            <HomeScreen navigation={mockNavigation}/>
          </SafeAreaProvider>
        )

        await waitFor(() => {
          fireEvent.changeText(getByPlaceholderText('Search...'), 'Past Event')
          expect(getAllByText('Past Event 2')).toBeTruthy()
    
          fireEvent.changeText(getByPlaceholderText('Search...'), '')
          expect(getAllByText('Past Event 1')).toBeTruthy()

          fireEvent.press(getByText('Map View'))
          expect(getByText('Map View')).toBeTruthy()
        })
    })
    
    it('displays correct event details', async () => {
        const component= render(
          <SafeAreaProvider>
            <HomeScreen navigation={mockNavigation}/>
          </SafeAreaProvider>
        )
        await waitFor(() => {
          
          //expect(getByText('Balelek 2023')).toBeTruthy()
          //expect(getByText('2023-04-04')).toBeTruthy()
          
        })
        expect(component).toBeTruthy()
        
    })

    it('keyboard disapear if we click aside', () => {
        const { getByPlaceholderText } = render(
          <SafeAreaProvider>
            <HomeScreen navigation={mockNavigation}/>
          </SafeAreaProvider>
        )
        fireEvent.press(getByPlaceholderText('Search...'))
        expect(getByPlaceholderText('Search...')).toBeTruthy()
    })

    it('can change screen', () => {
      const { getByText } = render(
        <SafeAreaProvider>
          <HomeScreen navigation={mockNavigation}/>
        </SafeAreaProvider>
      )
      fireEvent.press(getByText('Announcements'))
      fireEvent.press(getByText('Events'))
    })

    it('has dummy', async () => {
      const { getByText } = render(
        <SafeAreaProvider>
          <HomeScreen navigation={mockNavigation}/>
        </SafeAreaProvider>
      )
      await waitFor(() => {
        fireEvent.press(getByText('dummy'))
      })
    })



})




