import React, { useState } from "react";
import { Button, Text, StyleSheet, StatusBar, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const StatusBarComponent = () => {
    const [visibleStatusBar, setVisibleStatusBar] = useState(false);

    const changeVisibilityStatusBar = () => {
        setVisibleStatusBar(!visibleStatusBar);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textStyle}>StatusBar Visibility: {!visibleStatusBar ? 'Visible' : 'Hidden'}</Text>
            </View>
            <StatusBar backgroundColor="blue" />
            <View>
                <StatusBar hidden={visibleStatusBar} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => changeVisibilityStatusBar()} style={styles.button} accessible={true} accessibilityLabel="Toggle StatusBar">
                    <Text style={{ textAlign: 'center' }}>Toggle StatusBar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ECF0F1',
        padding: 8
    },
    buttonContainer: {
        padding: 10
    },
    textStyle: {
        textAlign: 'center'
    },
    button: {
        width: '100%',
        borderColor: 'gray',
        backgroundColor: '#1199ff',
        borderWidth: 2,
        borderRadius: 19,
        padding: 10,
    }
});

export default StatusBarComponent;
