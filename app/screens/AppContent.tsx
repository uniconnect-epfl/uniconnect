// AppContent.tsx
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface AppContentProps {
    navigation: NavigationProp<any>;
}

const AppContent = ({navigation}: AppContentProps ) => {
    return (
        <View style={styles.container}>
            <Button title="ToDos" onPress={() => navigation.navigate('ToDos')} />
            <Button title="Log out" onPress={() => FIREBASE_AUTH.signOut()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    authLabel: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default AppContent;
