import React from 'react'
import { render } from '@testing-library/react-native'
import { MyProfileScreen } from '../../../../screens/Profile/MyProfileScreen/MyProfileScreen'

describe('MyProfileScreen', () => {
  
  it('renders the screen', () => {
    const component = render(<MyProfileScreen />)
    expect(component).toBeTruthy()
  })
  
})