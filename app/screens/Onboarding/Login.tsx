import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import styles from './styles';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const loginEmailPassword = async () => {
        setLoading(true);
        try {
            const unserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = unserCredential.user;
            console.log(user);

        } catch (error) {
            if (error instanceof Error) { // Type-guard check
                console.log(`There was an error: ${error.message}`);
            }
            alert('There was an error' + error);

        } finally {
            setLoading(false);
        }
    }

    const createAccount = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created. Check email');
        } catch (error) {
            if (error instanceof Error) { // Type-guard check
                console.log(`There was an error: ${error.message}`);
            }
            alert('There was an error' + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <>
                    <Button
                        title="Log In"
                        onPress={loginEmailPassword}
                    />
                    <Button
                        title="Create Account"
                        onPress={createAccount}
                    />
                </>}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;
