// Footer.tsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Footer: React.FC = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Linking.openURL('https://firebase.google.com/')}>
                <Image
                    source={{ uri: 'https://firebase.google.com/images/brand-guidelines/logo-standard.png' }}
                    style={styles.logo}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 100, // Adjust based on your image
        height: 40, // Adjust based on your image
        resizeMode: 'contain',
    },
});

export default Footer;
