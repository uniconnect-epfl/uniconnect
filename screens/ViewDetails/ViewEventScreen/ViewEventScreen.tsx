import React, { View, Text } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

type RootStackParamList = {
    ViewEventScreen: {
        uid: string;
    }
}
  
type ViewEventScreenRouteProps = RouteProp<RootStackParamList, "ViewEventScreen">

const ViewEventScreen = () => {
  const { uid } = useRoute<ViewEventScreenRouteProps>().params

  return (
    <View>
      <Text>This is the view annoucment screen, uid: {uid}</Text>
    </View>
  )
}

export default ViewEventScreen