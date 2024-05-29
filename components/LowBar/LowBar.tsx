import React, { useContext } from "react"
import { View, TouchableOpacity, Text } from "react-native"

import styles from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { RegistrationContext } from "../../contexts/RegistrationContext"
import { storeInitialUserData } from "../../firebase/Registration"

interface LowBarProps {
  nextScreen?: string
  buttonText?: string
  authenticate?: () => void
  checkFields?: () => boolean
  goBack?: boolean
}

const LowBar: React.FC<LowBarProps> = ({
  nextScreen,
  buttonText,
  authenticate = () => {},
  checkFields = () => true,
  goBack = true,
}) => {
  const navigation = useNavigation()
  const textB = buttonText ? buttonText : "Next"
  const { user, firstName, lastName, location, date, description, selectedInterests, setFromGoogle } = useContext(RegistrationContext)
  const justifyCondition = goBack? "space-between" : "flex-end"

  return (
    <View style={[styles.nextBar, { justifyContent: justifyCondition }]}>
      {goBack &&
        <TouchableOpacity
          style={[styles.buttonSmall, styles.buttonSmallLeft]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonTextLeft, globalStyles.text]}>Back</Text>
        </TouchableOpacity>
      }

      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={() => {
          if (nextScreen === "ExploreTabs") {
            if (user) {
              const email = user.email || ""
              storeInitialUserData(user.uid, email, firstName, lastName, date, location, description, selectedInterests)
              setFromGoogle(false)
            } else {
              authenticate()
            }
          } else if (checkFields()) {
            navigation.navigate(nextScreen as never)
          }
        }}
      >
        <Text style={[styles.buttonText, globalStyles.text]}>{textB}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LowBar
