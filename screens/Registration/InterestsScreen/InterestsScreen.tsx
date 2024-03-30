import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles';

interface InterestButtonProps {
  title: string;
  selected: boolean;
  onSelect: () => void;
}

const InterestButton: React.FC<InterestButtonProps> = ({ title, selected, onSelect }) => (
  
  <TouchableOpacity
    style={[styles.interestButton, selected && styles.selectedInterestButton]}
    onPress={onSelect}
  >
    <Text style={[styles.interestText, selected && styles.selectedInterestText]}>{title}</Text>
  </TouchableOpacity>
);

const InterestsScreen = () => {
  // You should replace this with a state to handle the selected interests
  const selectedInterests = new Set<string>();

  // Dummy interests array
  const interests = ['Machine Learning', 'Artificial Intelligence', 'Computer Vision', 'Data Science', 'NLP', 'Sport', 'Assembly', 'Pawning', 'Cyber Security', 'Blockchain', 'Ethereum', 'Solana   '];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.has(interest)) {
      selectedInterests.delete(interest);
    } else {
      selectedInterests.add(interest);
    }
    // Normally, you would update the state here to re-render the component
  };

  return (

    <View style={styles.container}>
    <Image source ={require("../../../assets/icon.png")} style={styles.image} />  
    <ScrollView style={styles.container}>
        
      <Text style={styles.title}>Select your interests</Text>
      
      <View>
        <TextInput placeholder='Search'style={styles.input}></TextInput>
      </View>


      <View style={styles.interestsGrid}>


        {interests.map((interest) => (
          <InterestButton
            key={interest}
            title={interest}
            selected={selectedInterests.has(interest)}
            onSelect={() => toggleInterest(interest)}
          />


        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>


  );
};

export default InterestsScreen;
