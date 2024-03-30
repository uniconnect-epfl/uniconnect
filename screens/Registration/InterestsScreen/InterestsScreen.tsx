/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles';

interface InterestButtonProps {
  title: string;
  selected: boolean;
  onSelect: () => void;
}

const InterestButton: React.FC<InterestButtonProps> = ({ title, selected, onSelect }) => (
  
  <TouchableOpacity 
    style={[styles.interestButton, 
        selected && styles.selectedInterestButton]} 
    onPress={onSelect}>

      <Text style={[styles.interestText, 
        selected && styles.selectedInterestText]}>{title}</Text>

  </TouchableOpacity>
);

const interests = ['Machine Learning', 'Artificial Intelligence', 'Computer Vision', 'Data Science', 'NLP', 'Sport', 'Assembly', 'Pawning', 'Cyber Security', 'Blockchain', 'Ethereum', 'Solana'];


const InterestsScreen = () => {
    const[SearchTerm, setSearchTerm] = useState('');
    const[filterdedInterests, setFilteredInterests] = useState(interests);
    const[selectedInterests, setSelectedInterests] = useState(new Set());

 
  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
        const newSelectedInterests = new Set(prev);
        if(newSelectedInterests.has(interest)){
            newSelectedInterests.delete(interest);
        }else{
            newSelectedInterests.add(interest)
        }
        return newSelectedInterests;
    })
  }



  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if(text){
        const filteredData = interests.filter((interest) =>
        interest.toLocaleLowerCase().includes(text.toLowerCase())
        );
        setFilteredInterests(filteredData);
    }else{
        setFilteredInterests(interests);
    }
  
    };

  return (

    <View style={styles.container}>
    <Image source ={require("../../../assets/icon.png")} style={styles.image} />  
    <ScrollView style={styles.container}>
        
      <Text style={styles.title}>Select your interests</Text>
      
      <View>
        <TextInput 
            placeholder='Search'
            style={styles.input}
            onChangeText={handleSearch}/>
      </View>

      <View style={styles.interestsGrid}>


        {filterdedInterests.map((interest) => (
          <InterestButton
            key={interest}
            title={interest}
            selected = {selectedInterests.has(interest)}
            onSelect={() => toggleInterest(interest)}
          />
        ))}

      </View>


      <View>
        <View style={styles.nextBar}>

        <TouchableOpacity style={[styles.buttonSmall, styles.buttonSmallLeft]}>
        <Text style = {styles.buttonTextLeft}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonSmall}>
        <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>


          </View>
      </View>
    </ScrollView>
    </View>


  );
};

export default InterestsScreen;
