// RegistrationStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthenticationScreen} from '../../screens/Registration/AuthenticationScreen/AuthenticationScreen';
import {InformationScreen} from '../../screens/Registration/InformationScreen/InformationScreen';
import {InterestsScreen} from '../../screens/Registration/InterestsScreen/InterestsScreen';

export type RegistrationStackParamList = {
  Authentication: undefined;  // Add parameters if any, e.g., { userId: string }
  Information: undefined;     // Add parameters if any
  Interests: undefined;       // Add parameters if any
};

const Stack = createStackNavigator<RegistrationStackParamList>();

const RegistrationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Authentication">
      <Stack.Screen
        name="Authentication"
        component={AuthenticationScreen}
        options={{ headerShown: false }} // Set options as needed, e.g., hiding the header
      />
      <Stack.Screen
        name="Information"
        component={InformationScreen}
        options={{ headerShown: false }} // Customize your screen options
      />
      <Stack.Screen
        name="Interests"
        component={InterestsScreen}
        options={{ headerShown: false }} // Customize your screen options
      />
    </Stack.Navigator>
  );
};

export default RegistrationStackNavigator;
