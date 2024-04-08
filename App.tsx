import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RegistrationStackNavigator from './navigation/Registration/RegistrationStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      < RegistrationStackNavigator/>
    </NavigationContainer>

  );
}
