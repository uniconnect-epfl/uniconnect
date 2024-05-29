import React, { useState, useEffect, useContext } from "react"
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
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility"
import { RegistrationContext } from "../../../contexts/RegistrationContext"
import { useNavigation, useRoute } from "@react-navigation/native"

interface InterestButtonProps {
  interest: Interest
  selected: boolean
  onSelect: (interest: Interest) => void
  testID: string
}

const InterestButton: React.FC<InterestButtonProps> = ({
  interest,
  selected,
  onSelect,
  testID,
}) => (
  <TouchableOpacity
    style={[styles.interestButton, selected && styles.selectedInterestButton]}
    onPress={() => onSelect(interest)}
    testID={testID}
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
  const route = useRoute()
  const navigation = useNavigation()
  const eventMode = route.params?.eventMode

  const insets = useSafeAreaInsets()
  const [searchTerm, setSearchTerm] = useState("")
  const [interests, setInterests] = useState<Interest[]>([])
  const [filteredInterests, setFilteredInterests] = useState<Interest[]>([])
  const { selectedInterests, setSelectedInterests, fromGoogle } = useContext(RegistrationContext)
  const [isLoading, setIsLoading] = useState(true)
  const keyboardVisible = useKeyboardVisibility()

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
      selectedInterests.filter((label) => label !== interest)
    )
  }

  //Handle the selection of an interest
  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((prevSelectedInterests) => {
      if (prevSelectedInterests.includes(interest.title)) {
        return prevSelectedInterests.filter((label) => label !== interest.title)
      } else {
        return [...prevSelectedInterests, interest.title]
      }
    })

    if (eventMode && selectedInterests.length === 2) {
      navigation.goBack()
    }
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
      setFilteredInterests(interests)
    }
  }

  const renderItem = ({ item }: { item: Interest }) => (
    <InterestButton
      interest={item}
      selected={selectedInterests.includes(item.title)}
      onSelect={(interest: Interest) => toggleInterest(interest)}
      testID={item.title + "ID"}
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
        {`Select ${eventMode ? "three" : "your"} interests`}
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
            {selectedInterests.map((label) => (
              <Label
                key={label}
                text={label}
                onClick={() => handleRemoveInterest(label)}
                testID={label + "IDlabel"}
              />
            ))}
          </ScrollView>
        )}

        <FlatList
          data={filteredInterests}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          numColumns={2}
          style={styles.interestsGrid}
        />

        <View style={[styles.footer, { bottom: insets.bottom }]}>
          {!keyboardVisible && !eventMode && <LowBar nextScreen={fromGoogle? "ExploreTabs" : "Authentication"} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default InterestsScreen
