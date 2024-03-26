import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import OnboardingScreen  from './screens/Onboarding/OnboardingScreen';


export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <OnboardingScreen />
    </View>
  );
}


