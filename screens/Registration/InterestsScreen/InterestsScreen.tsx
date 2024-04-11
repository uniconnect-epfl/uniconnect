import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import styles from './styles';
import '../../../assets/global/globalStyles';
import { globalStyles } from '../../../assets/global/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LowBar from '../../../components/LowBar/LowBar';

interface InterestButtonProps {
  title: string;
  selected: boolean;
  onSelect: () => void;
}

const InterestButton: React.FC<InterestButtonProps> = ({
  title,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[styles.interestButton, selected && styles.selectedInterestButton]}
    onPress={onSelect}
  >
    <Text
      style={[
        [styles.interestText, globalStyles.text],
        selected && styles.selectedInterestText,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const interests = [
  'Machine Learning',
  'Artificial Intelligence is very cool',
  'Computer Vision',
  'Data Science',
  'NLP',
  'Sport',
  'Assembly',
  'Pawning',
  'Cyber Security',
  'Blockchain',
  'Ethereum',
  'Solana',
  'Computer graphics',
  'Bananas',
  'Apples',
  'Big tech',
  'Finance',
  'Gaspard tes teubé t con',
];

const InterestsScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterdedInterests, setFilteredInterests] = useState(interests);
  const [selectedInterests, setSelectedInterests] = useState(new Set());

  const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <InterestButton
      title={item}
      selected={selectedInterests.has(item)}
      onSelect={() => toggleInterest(item)}
    />
  );

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const newSelectedInterests = new Set(prev);
      if (newSelectedInterests.has(interest)) {
        newSelectedInterests.delete(interest);
      } else {
        newSelectedInterests.add(interest);
      }
      return newSelectedInterests;
    });
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (searchTerm) {
      const filteredData = interests.filter((interest) =>
        interest.toLocaleLowerCase().includes(text.toLowerCase())
      );
      setFilteredInterests(filteredData);
    } else {
      setFilteredInterests(interests);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.image}
      />
      <Text style={[styles.title, globalStyles.boldText]}>
        Select your interests
      </Text>

      <View>
        <TextInput
          placeholder="Search"
          style={[styles.input, globalStyles.text]}
          onChangeText={handleSearch}
        />
      </View>


        <FlatList
          data={filterdedInterests}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={2} 
          style={styles.interestsGrid} 
        />


      <View style={styles.footer}>
        <LowBar nextScreen="Authentication" />
      </View>
    </View>
  );
};

export default InterestsScreen;
