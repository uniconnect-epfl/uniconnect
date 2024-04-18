import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

interface SectionTabsProps {
  choices: string[]
  startingChoice: string
  selectBarWidth?: number
  onChoiceChange: (newChoice: string) => void
}

const SectionTabs: React.FC<SectionTabsProps> = ({
    choices,
    startingChoice,
    selectBarWidth = 80,
    onChoiceChange
}) => {
    const [currentChoice, setCurrentChoice] = useState(startingChoice)

    const RenderOneSection = ({ choice, index } : {choice : string, index: number}) => (
        <TouchableOpacity
            key={index}  // Ensure unique key for each child
            style={styles.tabContainer}
            onPress={() => {
                setCurrentChoice(choice)
                onChoiceChange(choice)
            }}>
            <Text 
                style={[globalStyles.boldText, choice === currentChoice ? styles.black : styles.lightGray]}>
                {choice}
            </Text>
            <View 
                style={[
                    choice === currentChoice ? styles.selectedBar : styles.unselectedBar, 
                    {width: selectBarWidth}
                ]}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.tabsContainer}>
            <View/>
            {choices.map((choice, index) => RenderOneSection({ choice, index }))}
            <View/>
        </View>
    )
}

export default SectionTabs
