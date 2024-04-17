
import { styles } from './styles'
import ExpandableDescription from '../../../components/ExpandableDescription/ExpandableDescription'
import GeneralProfile from '../../../components/GeneralProfile/GeneralProfile'
import React from 'react'

import { View, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../../assets/global/globalStyles'
import { peach} from '../../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'





export const MyProfileScreen = () => {
  const navigation = useNavigation()
  //const [editMode, setEditMode] = React.useState(false)

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color={peach} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>
        
        <TouchableOpacity style={styles.button} >

          <Text style={globalStyles.boldText}>Update</Text>
        </TouchableOpacity>
      </View>
      
      
      <View style={styles.leftAlign}>
        <GeneralProfile
          name={'Name'}
          surname={'Surname'}
          location={'le Mont-sur-Lausanne'}
        />
        <TouchableOpacity style={styles.button} >

          <Text style={globalStyles.boldText}>Update</Text>
        </TouchableOpacity>

      </View>

      <ExpandableDescription
        description={'slajfeiohadslh oh ho sdhv lsvnjls bvdfjl vj shdls hvueri hvueos hvurei shvureio vhruieo vhuris hviuds vnfjd re vuirep uir hfeuiphgfure fhueir hguriewp hfurie hfruie hfuire hfure uire uier huirs hui bhuero vureso huire hure hzureepseo guers hvuip vuip hurieps hurips hvurips bhutrid bhurtipd hbuips hurieps huiers vhurieps vuries hvureips hureis bfhres fures huirpe burip vuirso hvzureo gfuersh guirp hutirp hveruips vuresp hv'}
      />
      <View>

      </View>


    </View>
  )
}
