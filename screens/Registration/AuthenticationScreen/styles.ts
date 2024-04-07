import { StyleSheet } from "react-native"
import { peach, white} from '../../../assets/colors/colors'



export const styles = StyleSheet.create({
    container: {
      alignItems: 'center', // Center horizontally
      backgroundColor: white, // Set a background color
      flex: 1,
      justifyContent: 'center', // Center vertically
      
    },
    text: {
      color: peach, // Set the text color to ensure it's visible
      marginBottom: 20, // Add some space below the text
    },
  });