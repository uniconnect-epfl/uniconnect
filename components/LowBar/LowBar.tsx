import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import { globalStyles } from '../../assets/global/globalStyles';




const LowBar: React.FC = () => {
    return(
        <View style={styles.nextBar}>

            <TouchableOpacity style={[styles.buttonSmall, styles.buttonSmallLeft]}>
            <Text style = {[styles.buttonTextLeft, globalStyles.text]}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.buttonSmall}>
            <Text style={[styles.buttonText, globalStyles.text]}>Next</Text>
            </TouchableOpacity>

        </View>
    )
    
};

export default LowBar;

