import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';

import SignupForm from './SignupForm';

const Signup = ({ navigation }) => {
    //const handleDrag = res => console.log(res);

    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <SignupForm navigation={navigation} />
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

export default Signup;
