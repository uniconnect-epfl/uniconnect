import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import styles from './styles'
import { globalStyles } from '../../assets/global/globalStyles'
import { useNavigation } from '@react-navigation/native'

interface LowBarProps {
  nextScreen?: string
}

const LowBar: React.FC<LowBarProps> = ({ nextScreen }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.nextBar}>
      <TouchableOpacity
        style={[styles.buttonSmall, styles.buttonSmallLeft]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonTextLeft, globalStyles.text]}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={() => navigation.navigate(nextScreen as never)}
      >
        <Text style={[styles.buttonText, globalStyles.text]}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LowBar
