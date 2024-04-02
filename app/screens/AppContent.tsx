// AppContent.tsx
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import type {
    ParamListBase,
  } from '@react-navigation/routers';
interface AppContentProps {
    navigation: NavigationProp<ParamListBase>;
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
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default AppContent;
