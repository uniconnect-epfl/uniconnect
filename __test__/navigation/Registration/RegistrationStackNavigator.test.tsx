import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import RegistrationStackNavigator from '../../../navigation/Registration/RegistrationStackNavigator'

describe('RegistrationStackNavigator', () => {
    it('renders the stack navigator with expected initial route', () => {
        const component = render(
            <NavigationContainer>
                <RegistrationStackNavigator />
            </NavigationContainer>
        )
        expect(component).toBeTruthy()
    })
})
