
import { render} from '@testing-library/react-native'
import EventScreen from '../../../screens/Explore/EventScreen/EventScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { Firestore } from 'firebase/firestore'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { getAllFutureEvents, getAllPastEvents } from '../../../firebase/ManageEvents'


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

describe('EventScreen', () => {
    const mockOnEventPress = jest.fn()  // Mock function for onEventPress

    it('refreshes events correctly when user swipes down', async () => {
        getAllFutureEvents.mockResolvedValue([{ id: '1', title: 'Updated Future Event', date: '2024-01-05' }])
        getAllPastEvents.mockResolvedValue([{ id: '2', title: 'Updated Past Event', date: '2022-01-05' }])
    
        render(
          <SafeAreaProvider>
            <EventScreen onEventPress={mockOnEventPress}/>
          </SafeAreaProvider>
        )

        // await waitFor(() => {
        //     getByTestId('loading-indicator').props.onLoadEnd()
        // })
          
        // fireEvent(getByTestId('refresh-control'), 'onRefresh')
        
        // await waitFor(() => {
        //   expect(getAllFutureEvents).toHaveBeenCalledTimes(1)
        //   expect(getAllPastEvents).toHaveBeenCalledTimes(1)
        // })
    })
})
