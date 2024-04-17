import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"

interface SelectableChoicesProps {
  choices: string[]
  startingChoice: string
  selectBarWidth?: number
  onChoiceChange: (newChoice: string) => void
}

const SelectableChoices: React.FC<SelectableChoicesProps> = ({
    choices,
    startingChoice,
    selectBarWidth = 80,
    onChoiceChange
}) => {
    const [currentChoice, setCurrentChoice] = useState(startingChoice)

    const RenderOneChoice = ({ choice, index } : {choice : string, index: number}) => (
        <TouchableOpacity
            key={index}  // Ensure unique key for each child
            style={styles.choiceContainer}
            onPress={() => {
                setCurrentChoice(choice)
                onChoiceChange(choice)
            }}>
            <Text 
                style={choice === currentChoice ? styles.selectedText : styles.unselectedText}>
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
        <View style={styles.choicesContainer}>
            <View/>
            {choices.map((choice, index) => RenderOneChoice({ choice, index }))}
            <View/>
        </View>
    )
}

export default SelectableChoices
