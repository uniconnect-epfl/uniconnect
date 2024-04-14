import React from 'react'
import { render } from '@testing-library/react-native'
import HomeTabNavigator from '../../../navigation/Home/HomeTabNavigator'
import { NavigationContainer } from '@react-navigation/native'

describe('HomeTabNavigator', () => {
    it('renders the bottom tab navigator with expected initial route', () => {
        const component = render(
            <NavigationContainer>
                <HomeTabNavigator />
            </NavigationContainer>
        )
        expect(component).toBeTruthy()
    })
})
