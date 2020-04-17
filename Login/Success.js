import React from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';

const Success = ({ navigation }) => {

    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Text>Success</Text>
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

export default Success;
