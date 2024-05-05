import React from 'react'
import { render } from '@testing-library/react-native'
import AnnouncementScreen from '../../../screens/Home/AnnouncementScreen/AnnouncementScreen'
import AnnouncementCard from '../../../components/AnnoucementCard/AnnouncementCard'

// Import your AnnouncementScreen component

// Mock any external components not relevant for the test
jest.mock('react-native-gesture-handler', () => ({
  // eslint-disable-next-line react/prop-types
  TouchableOpacity: ({ children, onPress }) => <div onClick={onPress}>{children}</div>
}))
jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => "Ionicon"
}))
jest.mock('../../../components/AnnoucementCard/AnnouncementCard', () => 'AnnouncementCard')
describe('AnnouncementScreen', () => {

  it('renders correctly', async () => {
    const { getByText, debug } = render(
      
        <AnnouncementScreen onAnnoucmentPress={() => {}} />
      
    )
    debug()
    // Verify that the screen renders future announcements
    expect(getByText('Future Announcements')).toBeTruthy()
  }),
  it('rendre card correclty', async () => {
      const announcement = {
        uid: '1',
        title: 'Spring Festival',
        location: 'Community Park',
        description: 'Annual community gathering',
        date: '2023-05-10',
        interests: ['Music', 'Food', 'Games']
      }
  
      const component = render(<AnnouncementCard {...announcement} />)
      expect(component).toBeTruthy()
  } 
)
})