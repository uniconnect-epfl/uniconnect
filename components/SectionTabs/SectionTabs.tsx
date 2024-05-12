import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

interface SectionTabsProps {
  tabs: string[]
  startingTab: string
  onTabChange: (newTab: string) => void
}

const SectionTabs: React.FC<SectionTabsProps> = ({
    tabs,
    startingTab,
    onTabChange
}) => {
    const [currentTab, setCurrentTab] = useState(startingTab)
    const sectionSize = 100 / tabs.length

    const RenderOneSection = ({ tab, index } : {tab : string, index: number}) => (
        <Pressable
            key={index}  // Ensure unique key for each child
            style={[styles.tabContainer, { width: `${sectionSize}%` }]}
            onPress={() => {
                setCurrentTab(tab)
                onTabChange(tab)
            }}>
            <Text 
                style={[globalStyles.boldText, tab === currentTab ? styles.black : styles.lightGray]}>
                {tab}
            </Text>
            <View 
                style={tab === currentTab ? styles.selectedBar : styles.unselectedBar}
            />
        </Pressable>
    )

    return (
        <View style={styles.tabsContainer}>
            {tabs.map((tab, index) => RenderOneSection({ tab, index }))}
        </View>
    )
}

export default SectionTabs
