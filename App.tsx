import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import RegistrationStackNavigator from './navigation/Registration/RegistrationStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';
import {
  useFonts,
  JetBrainsMono_100Thin_Italic,
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    JetBrainsMono_100Thin_Italic,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <NavigationContainer>
        <SafeAreaProvider>
          <RegistrationStackNavigator/>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
    
  );
}
