import React from 'react'
import { render } from '@testing-library/react-native'
import { ProfileEvents } from '../../../../screens/Profile/ProfileEvents/ProfileEvents'

describe('ProfileEvents', () => {
  
  it('renders correctly', () => {
    const component = render(<ProfileEvents />)
    expect(component).toBeTruthy()
  })
  
})