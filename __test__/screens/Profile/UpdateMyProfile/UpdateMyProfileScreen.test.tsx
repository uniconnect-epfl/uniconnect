import React from 'react'
import { render } from '@testing-library/react-native'
import { UpdateMyProfileScreen } from '../../../../screens/Profile/UpdateMyProfile/UpdateMyProfileScreen'

describe('UpdateMyProfileScreen', () => {
  
  it('renders correctly', () => {
    const component = render(<UpdateMyProfileScreen />)
    expect(component).toBeTruthy()
  })
  
})