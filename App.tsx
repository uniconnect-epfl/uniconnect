import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import AppContent from './app/screens/AppContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';


const Stack = createNativeStackNavigator();
const AppContentStack = createNativeStackNavigator();

function AppLayout () {
  return (
    <AppContentStack.Navigator>
      <AppContentStack.Screen name="AppContent" component={AppContent} />
    </AppContentStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('User state changed. Current user:', user);
      setUser(user);
    });
  }
  , []);

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name="AppLayout" component={AppLayout} options={{headerShown: false}} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


