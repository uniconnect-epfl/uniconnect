//import OnboardingScreen from './screens/Onboarding/OnboardingScreen';
import InformationScreen from './screens/Registration/InformationScreen/InformationScreen'

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
    return;
  }
  
  return (

      <InformationScreen />

  );
}



