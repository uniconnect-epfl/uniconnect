import { View } from "react-native"
import { styles } from "./styles"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"

export const MyProfileScreen = () => {
  return (
    <View style={styles.view}>

      <View style={styles.leftAlign}>
        <GeneralProfile
          name={"Name"}
          surname={"Surname"}
          location={"le Mont-sur-Lausanne"}
        />
      </View>

      <ExpandableDescription
        description={"slajfeiohadslh oh ho sdhv lsvnjls bvdfjl vj shdls hvueri hvueos hvurei shvureio vhruieo vhuris hviuds vnfjd re vuirep uir hfeuiphgfure fhueir hguriewp hfurie hfruie hfuire hfure uire uier huirs hui bhuero vureso huire hure hzureepseo guers hvuip vuip hurieps hurips hvurips bhutrid bhurtipd hbuips hurieps huiers vhurieps vuries hvureips hureis bfhres fures huirpe burip vuirso hvzureo gfuersh guirp hutirp hveruips vuresp hv"}
      />

    </View>
  )
}