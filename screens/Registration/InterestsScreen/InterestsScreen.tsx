import React, { useContext, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import styles from "./styles"
import "../../../assets/global/globalStyles"
import { globalStyles } from "../../../assets/global/globalStyles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import LowBar from "../../../components/LowBar/LowBar"
import Label from "../../../components/Label/Label"
import { RegistrationContext } from "../../../contexts/RegistrationContext"

interface InterestButtonProps {
  title: string
  selected: boolean
  onSelect: () => void
}

const InterestButton: React.FC<InterestButtonProps> = ({
  title,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[styles.interestButton, selected && styles.selectedInterestButton]}
    onPress={onSelect}
    testID={`interestButton-${title}`}
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
)

const interestsList = [
  "Machine Learning",
  "Artificial Intelligence",
  "Computer Vision",
  "Data Science",
  "NLP",
  "Sport",
  "Assembly",
  "Pawning",
  "Cyber Security",
  "Blockchain",
  "Ethereum",
  "Solana",
  "Computer graphics",
  "Bananas",
  "Apples",
  "Big tech",
  "Finance",
]

const InterestsScreen = () => {
  const insets = useSafeAreaInsets()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterdedInterests, setFilteredInterests] = useState(interestsList)
  const [labelArray, setLabelArray] = useState<string[]>([])
  const { selectedInterests, setSelectedInterests } = useContext(RegistrationContext)

  const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <InterestButton
      title={item}
      selected={selectedInterests.includes(item)}
      onSelect={() => toggleInterest(item)}
    />
  )

  const handleRemoveInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((label) => label !== interest))
    setLabelArray((prev) => prev.filter((label) => label !== interest))
  }

  const toggleInterest = (interest: string) => {
    const newSelectedInterests = [...selectedInterests]
    if (newSelectedInterests.includes(interest)) {
      newSelectedInterests.filter((label) => label !== interest)
      // Build a new array without the interest
      setLabelArray((prev) => prev.filter((label) => label !== interest))
    } else {
      newSelectedInterests.push(interest)
      setLabelArray([...labelArray, interest])
    }
    setSelectedInterests(newSelectedInterests)
  }

  const handleSearch = (text: string) => {
    setSearchTerm(text)
    if (searchTerm) {
      const filteredData = interestsList.filter((interest) =>
        interest.toLocaleLowerCase().includes(text.toLowerCase())
      )
      setFilteredInterests(filteredData)
    } else {
      setFilteredInterests(interestsList)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]}
      >
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.image}
        />
        <Text style={[styles.title, globalStyles.boldText]}>
          Select your interests
        </Text>

        <TextInput
          placeholder="Search"
          style={[styles.input, globalStyles.text]}
          onChangeText={handleSearch}
        />

        {selectedInterests.length !== 0 && (
          <ScrollView
            horizontal={false}
            style={styles.labelView}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.labelContainer}
          >
            {labelArray.map((label) => (
              <Label
                key={label}
                text={label}
                onClick={() => handleRemoveInterest(label)}
              />
            ))}
          </ScrollView>
        )}

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
    </TouchableWithoutFeedback>
  )
}

export default InterestsScreen
