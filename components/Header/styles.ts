import { StyleSheet } from "react-native"
import { white} from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8
    },
    image: {
      height: 46,
      width: 46
    }
  })