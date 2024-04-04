// AppContent.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';


const AppContent = ( ) => {
    return (
        <View style={styles.container}>
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
