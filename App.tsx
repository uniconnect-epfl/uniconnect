/* eslint-disable @typescript-eslint/no-unused-vars */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RegistrationStackNavigator from './navigation/Registration/RegistrationStackNavigator';
//import HomeTabNavigator from './navigation/Home/HomeTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      < RegistrationStackNavigator/>
    </NavigationContainer>

  );
}

/* const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
}); */
