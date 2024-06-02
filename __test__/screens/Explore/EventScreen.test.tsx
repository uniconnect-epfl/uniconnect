

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import EventScreen from '../../../screens/Explore/EventScreen/EventScreen'
import React from 'react'
import { Firestore } from 'firebase/firestore'
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native'
import { showErrorToast } from '../../../components/ToastMessage/toast'


jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
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
    useNavigation: () => ({
      navigate: mockNavigation.navigate,
    }),
  }
})

jest.mock('../../../firebase/User.ts', () => ({
  getUserData: jest.fn(() => Promise.resolve({
    uid: "1234",
    email: "test",
    firstName: "alex",
    lastName: "doe",
    friends: [],
    date: new Date(),
    description: "test description",
    location: "test location",
    selectedInterests: [],
    profilePicture: "test.jpg",
    events: []
  }))
}))

export type User = {
  uid: string
  email: string
  firstName: string
  friends: string[]
  lastName: string
  date: Date
  description: string
  location: string
  selectedInterests: string[]
  profilePicture: string
  events: string[]
}
jest.mock('../../../firebase/User.ts', () => ({
  getUserData: jest.fn(() => Promise.resolve({
    uid: "1234",
    email: "test",
    firstName: "alex",
    lastName: "doe",
    friends: [],
    date: new Date(),
    description: "test description",
    location: "test location",
    selectedInterests: [],
    profilePicture: "test.jpg",
    events: []
  }))
}))

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

  it('refresh', async () => {

   
    const { getByText } = render(
      <NavigationContainer>
        
        
          <EventScreen onEventPress={() => { }} userID='123' />
        
        
      </NavigationContainer>
    )
    await waitFor (()  => {
    expect(getByText('Upcoming Events')).toBeTruthy()
    expect(getByText('Past Events')).toBeTruthy()
    
    })
  })

})

///Test for no events

jest.mock('../../../firebase/ManageEvents', () => ({
  getAllFutureEvents: jest.fn(() => Promise.resolve([
  ])),
  getAllPastEvents: jest.fn(() => Promise.resolve([
  ]))
}))
jest.mock("../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn(),
}))

describe('EventScreenNoEvents', () => {

  it('check Errors', async () => {

     render(
      <NavigationContainer>
        
          <EventScreen onEventPress={() => { }} userID='123' />
        
      </NavigationContainer>
    )
    await waitFor (() => {
    expect(showErrorToast).toHaveBeenCalledWith("You have no events yet.")
    })
  })

  it('check Errors', async () => {

    const {getByText}= render(
     <NavigationContainer>
       
         <EventScreen onEventPress={() => { }} userID='123' />
       
     </NavigationContainer>
   )
   await waitFor (() => {
   fireEvent.press(getByText('Create an event'))
   expect(mockNavigation.navigate).toHaveBeenCalled
 })
})

})