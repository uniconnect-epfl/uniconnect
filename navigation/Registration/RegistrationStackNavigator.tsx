
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthenticationScreen} from '../../screens/Registration/AuthenticationScreen/AuthenticationScreen';
import {InformationScreen} from '../../screens/Registration/InformationScreen/InformationScreen';
import {InterestsScreen} from '../../screens/Registration/InterestsScreen/InterestsScreen';

//Definition of type for Typescript compatibility
export type RegistrationStackParamList = {
  Authentication: undefined; 
  Information: undefined;     
  Interests: undefined;       
};

const Stack = createStackNavigator<RegistrationStackParamList>();

// return  the StackNavigation that will be called in the app to allow the user to Login/Register
const RegistrationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Authentication">
      <Stack.Screen
        name="Authentication"
        component={AuthenticationScreen}
        options={{ headerShown: false }} // Set options as needed, i.e hiding the header
      />
      <Stack.Screen
        name="Information"
        component={InformationScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Interests"
        component={InterestsScreen}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default RegistrationStackNavigator;
