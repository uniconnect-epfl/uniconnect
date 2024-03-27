import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import OnboardingScreen  from './screens/Onboarding/OnboardingScreen';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';



export default function App() {
  const[fontsLoaded, setFontsLoaded] = useState(false);

  //this loads the fonts to be used in the app
  useEffect(() => {
    const loadFonts = async () => {
    await Font.loadAsync({
      'JetBrains-Mono': require('./assets/fonts/JetBrainsMono-Regular.ttf'),
    })
    setFontsLoaded(true)
  }
  loadFonts()
  }, [])

  if(!fontsLoaded){
    //loading screen
    return 1;
  }
  
  return (
    <View>
      <StatusBar style="auto" />

      <OnboardingScreen />
    </View>
  );
}




