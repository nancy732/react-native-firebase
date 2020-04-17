import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';

import LoginForm from './LoginForm'
const Login = ({ navigation }) => {

    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <LoginForm navigation={navigation} />
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default Login;
