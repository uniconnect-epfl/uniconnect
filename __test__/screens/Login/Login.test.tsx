import React from 'react'
import { render } from '@testing-library/react-native'
import Login from '../../../app/screens/Onboarding/Login'

describe('Login', () => {
  
  it('renders the screen', () => {
    const component = render(<Login />)
    expect(component).toBeTruthy()
  })
  
})