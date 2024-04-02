//import OnboardingScreen from './screens/Onboarding/OnboardingScreen';
import InformationScreen from './screens/Registration/InformationScreen/InformationScreen'
//import InterestsScreen from './screens/Registration/InterestsScreen/InterestsScreen'

import React, {useEffect} from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { JetBrainsMono_100Thin_Italic,JetBrainsMono_400Regular, JetBrainsMono_700Bold, useFonts} from '@expo-google-fonts/jetbrains-mono'; 




export default function App() {
  //const[fontsLoaded, setFontsLoaded] = useState(false);

  const [fontsLoaded] = useFonts({ JetBrainsMono_100Thin_Italic, JetBrainsMono_400Regular, JetBrainsMono_700Bold})


  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  //this loads the fonts to be used in the app

  if(!fontsLoaded){
    //loading screen
    return (
      SplashScreen.preventAutoHideAsync()
    )}


  return (

    <InformationScreen />
    //<OnboardingScreen />

  );
}



