import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
    contact: {
        borderColor: colors.light.tabIconDefault,
        borderWidth: 1, 
        padding: 20, 
    },
    list: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
})
  