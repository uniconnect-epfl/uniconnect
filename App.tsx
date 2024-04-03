import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
//import OnboardingScreen from './screens/Onboarding/OnboardingScreen';
import InformationScreen from './screens/Registration/InformationScreen/InformationScreen';
//import InterestsScreen from './screens/Registration/InterestsScreen/InterestsScreen';
import { useFonts, JetBrainsMono_100Thin_Italic, JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { SafeAreaProvider } from 'react-native-safe-area-context'


export default function App() {

  const [fontsLoaded] = useFonts({ 
    JetBrainsMono_100Thin_Italic, 
    JetBrainsMono_400Regular, 
    JetBrainsMono_700Bold
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
    <SafeAreaProvider>
      <InformationScreen/>  
      {/* <InterestsScreen/>   */}
      {/* <OnboardingScreen/>  */}
    </SafeAreaProvider>) 
}