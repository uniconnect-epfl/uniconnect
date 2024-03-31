import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { peach, white } from '../../../assets/colors/colors';

// Define your navigation stack parameter list
type AuthStackParamList = {
  Authentication: undefined;
  Information: undefined;
  // Add other routes and parameters here as needed
};

// Define the navigation prop type based on the stack parameter list
type AuthenticationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Authentication'>;

// Define the component prop types
type AuthenticationScreenProps = {
  navigation: AuthenticationScreenNavigationProp;
};

// Define the component using the props type
export const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the AuthenticationScreen.</Text>
      <Button title="Go to Information" onPress={() => navigation.navigate('Information')} />
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center horizontally
    backgroundColor: white, // Set a background color
    flex: 1,
    justifyContent: 'center', // Center vertically
    
  },
  text: {
    color: peach, // Set the text color to ensure it's visible
    marginBottom: 20, // Add some space below the text
  },
});
