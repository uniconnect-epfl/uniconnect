import { StyleSheet } from "react-native"
import { lightGray } from "../colors/colors"

export const globalStyles = StyleSheet.create({
  boldText: {
    fontFamily: "JetBrainsMono_700Bold",
  },
  description: {
    color: lightGray,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "right",
  },
  smallText: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 10,
  },
  text: {
    fontFamily: "JetBrainsMono_400Regular",
  },
})
