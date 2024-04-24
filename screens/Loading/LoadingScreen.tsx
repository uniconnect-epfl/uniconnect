import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './styles'
import { peach } from '../../assets/colors/colors'

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={peach} />
    </View>
  )
}

export default LoadingScreen