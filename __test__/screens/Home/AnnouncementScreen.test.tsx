import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import AnnouncementScreen from '../../../screens/Home/AnnouncementScreen/AnnouncementScreen'
import { Firestore } from 'firebase/firestore'
import { getAllAnnouncements } from '../../../firebase/ManageAnnouncements'


// Import your AnnouncementScreen component

// Mock any external components not relevant for the test

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))

jest.mock('../../../firebase/ManageAnnouncements', () => ({
  getAllAnnouncements: jest.fn(() => Promise.resolve([
    { id: '1', title: 'Future Announcement 1', date: '2024-04-05' },
    { id: '2', title: 'Future Event 2', date: '2024-05-05' }
  ])),
}))

jest.mock('react-native-gesture-handler', () => ({
  // eslint-disable-next-line react/prop-types
  TouchableOpacity: ({ children, onPress }) => <div onClick={onPress}>{children}</div>
}))
jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => "Ionicon"
}))


jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

describe('AnnouncementScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays loading screen initially', async () => {
    const { findByTestId } = render(<AnnouncementScreen onAnnoucmentPress={() => {}}/>)
    const loader = await findByTestId('loading-indicator')
    expect(loader).toBeTruthy()
  })

  it('displays a message when there are no announcements', async () => {
    // Adjust the mock to return an empty array or null
    getAllAnnouncements.mockResolvedValueOnce([])
    const { getByText } = render(<AnnouncementScreen onAnnoucmentPress={() => {}}/>)
    await waitFor(() => {
      expect(getByText('Future Announcements')).toBeTruthy()
    })
  })

  it('handles errors during data fetching', async () => {
    // Simulate an error
    getAllAnnouncements.mockRejectedValueOnce(new Error('Network Error'))
    const { getByText } = render(<AnnouncementScreen onAnnoucmentPress={() => {}}/>)
    await waitFor(() => {
      expect(getByText('No future announcements available.')).toBeTruthy()
    })
  })

})