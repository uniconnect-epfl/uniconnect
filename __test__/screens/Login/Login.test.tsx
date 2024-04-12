import React from 'react'
import { render } from '@testing-library/react-native'
import Login from '../../../screens/Onboarding/FirebaseTemp/Login'

describe('Login', () => {
  
  it('renders the screen', () => {
    const component = render(<Login />)
    expect(component).toBeTruthy()
  })

  // need to be able to mock firebase in order to do more
  
})