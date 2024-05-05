import React, { View, Text } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

type RootStackParamList = {
  ViewAnnouncementScreen: {
      uid: string;
  }
}

type ViewAnnoucementScreenRouteProps = RouteProp<RootStackParamList, "ViewAnnouncementScreen">

const ViewAnnoucementScreen = () => {
  const { uid } = useRoute<ViewAnnoucementScreenRouteProps>().params

  return (
    <View>
      <Text>This is the view annoucment screen, uid: {uid}</Text>
    </View>
  )
}

export default ViewAnnoucementScreen