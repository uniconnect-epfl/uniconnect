import React from 'react'
import { render } from '@testing-library/react-native'
import { ProfileInterests } from '../../../../screens/Profile/ProfileInterests/ProfileInterests'

describe('ProfileInterests', () => {
  
  it('renders correctly', () => {
    const component = render(<ProfileInterests />)
    expect(component).toBeTruthy()
  })
  
})