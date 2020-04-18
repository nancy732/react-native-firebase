import React, { useState } from "react";
import { View, Picker, StyleSheet, Image } from "react-native";
import Images from '../assets/index'
export default function PickerComponent() {
    const [selectedValue, setSelectedValue] = useState("First Choice");
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="First Choice" value="1" />
                <Picker.Item label="Second Choice" value="2" />
            </Picker>
            <Image source={selectedValue == "First Choice" ? Images.invisible : Images.visible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#ECF0F1',
    },
    picker: {
        height: 50,
        width: 150,
    }
});