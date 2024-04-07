import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from "./styles"



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


