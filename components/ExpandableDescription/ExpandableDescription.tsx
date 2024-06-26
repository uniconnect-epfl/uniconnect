import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { black } from "../../assets/colors/colors"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

interface ExpandableDescriptionProps {
  description: string;
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({ description }) => {
  const initialNbLines = 4
  const [limitNbLines, setLimitNbLines] = useState(true)

  return (
    <View style={styles.container}>
      <Text 
        style={[globalStyles.smallText, styles.text]}
        numberOfLines={limitNbLines ? initialNbLines : undefined}
      >
        {description}
      </Text>

      {description.length > 70 &&
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setLimitNbLines(!limitNbLines) }
        >
            <Ionicons name={limitNbLines ? "chevron-down-outline" : "chevron-up-outline"} size={24} color={black} />
        </TouchableOpacity>
      }
    </View>
  )
}

export default ExpandableDescription
