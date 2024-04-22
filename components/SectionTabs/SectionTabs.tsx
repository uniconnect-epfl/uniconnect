import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

interface SectionTabsProps {
  tabs: string[]
  startingTab: string
  barWidth?: number
  onTabChange: (newTab: string) => void
}

const SectionTabs: React.FC<SectionTabsProps> = ({
    tabs,
    startingTab,
    barWidth = 80,
    onTabChange
}) => {
    const [currentTab, setCurrentTab] = useState(startingTab)

    const RenderOneSection = ({ tab, index } : {tab : string, index: number}) => (
        <TouchableOpacity
            key={index}  // Ensure unique key for each child
            style={styles.tabContainer}
            onPress={() => {
                setCurrentTab(tab)
                onTabChange(tab)
            }}>
            <Text 
                style={[globalStyles.boldText, tab === currentTab ? styles.black : styles.lightGray]}>
                {tab}
            </Text>
            <View 
                style={[
                    tab === currentTab ? styles.selectedBar : styles.unselectedBar, 
                    {width: barWidth}
                ]}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.tabsContainer}>
            <View/>
            {tabs.map((tab, index) => RenderOneSection({ tab, index }))}
            <View/>
        </View>
    )
}

export default SectionTabs
