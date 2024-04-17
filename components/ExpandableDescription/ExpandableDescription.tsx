import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { black } from '../../assets/colors/colors'
import { styles } from './styles'

interface ExpandableDescriptionProps {
  description: string;
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({ description }) => {
  const initialNbLines = 4
  const [limitNbLines, setLimitNbLines] = useState(true)

  return (
    <View>
      <Text 
          style={styles.text}
          numberOfLines={limitNbLines ? initialNbLines : undefined}>
          {description}
        </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setLimitNbLines(!limitNbLines) }>
          <Ionicons name={limitNbLines ? 'chevron-down-outline' : 'chevron-up-outline'} size={24} color={black} />
      </TouchableOpacity>
    </View>
  )
}

export default ExpandableDescription
