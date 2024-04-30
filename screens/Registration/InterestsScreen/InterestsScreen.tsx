import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
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
import { fetchInterests, Interest } from "../../../firebase/Interests"
import LoadingScreen from "../../Loading/LoadingScreen"

interface InterestButtonProps {
  interest: Interest
  selected: boolean
  onSelect: (interest: Interest) => void
}

const InterestButton: React.FC<InterestButtonProps> = ({
  interest,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[styles.interestButton, selected && styles.selectedInterestButton]}
    onPress={() => onSelect(interest)}
    testID={`interestButton-${interest.title}`}
  >
    <Text
      style={[
        [styles.interestText, globalStyles.text],
        selected && styles.selectedInterestText,
      ]}
    >
      {interest.title}
    </Text>
  </TouchableOpacity>
)

const InterestsScreen = () => {
  const insets = useSafeAreaInsets()
  const [searchTerm, setSearchTerm] = useState("")
  const [interests, setInterests] = useState<Interest[]>([])
  const [filterdedInterests, setFilteredInterests] = useState<Interest[]>([])
  const [labelArray, setLabelArray] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set([])
  )
  const [isLoading, setIsLoading] = useState(true)

  //fetching the interests
  useEffect(() => {
    fetchInterests()
      .then((interests) => {
        setInterests(interests)
        setFilteredInterests(interests)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch interests: ", error)
        setIsLoading(false)
      })
  }, [])

  const handleRemoveInterest = (interest: string) => {
    setSelectedInterests(
      (prev) => new Set([...prev].filter((label) => label !== interest))
    )
    setLabelArray((prev) => prev.filter((label) => label !== interest))
  }

  //Handle the selection of an interest
  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((prevSelectedInterests) => {
      const newSelected = new Set(prevSelectedInterests)
      if (newSelected.has(interest.title)) {
        newSelected.delete(interest.title)
      } else {
        newSelected.add(interest.title)
      }
      setLabelArray(Array.from(newSelected))
      return newSelected
    })
  }

  //Handles the search bar
  const handleSearch = (text: string) => {
    setSearchTerm(text)
    if (searchTerm) {
      setFilteredInterests(
        interests.filter((interest) =>
          interest.title.toLowerCase().includes(text.toLowerCase())
        )
      )
    } else {
      setFilteredInterests(interestsList)
    }
  }

  const renderItem = ({ item }: { item: Interest }) => (
    <InterestButton
      interest={item}
      selected={selectedInterests.has(item.title)}
      onSelect={(interest: Interest) => toggleInterest(interest)}
    />
  )

  //Loading screen if the interest list is not completely arrived
  if (isLoading) {
    return <LoadingScreen />
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
          keyExtractor={(item) => item.title}
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
