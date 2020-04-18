import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Modal, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import Images from '../assets/index';
import database from '@react-native-firebase/database';
export default function LoginForm({ navigation }) {

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [result, setResult] = useState()
    const [visible, setVisible] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const handleVisibility = e => {
        setVisible(!visible)
    }
    const handleNavigate = e => {
        navigation.navigate("Signup");
    }
    const handleForgot = e => {
        setModalVisible(true);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            Email: Email,
            Password: Password
        };
        if (
            Email == "" ||
            Password == ""
        ) {
            setResult("Required!");
        }
        else {
            database()
                .ref('/users')
                .once('value')
                .then(snapshot => {
                    snapshot.val().map(value => {
                        if (value != null) {
                            if (value.Email === user.Email && value.Password === user.Password) {
                                navigation.navigate('Success')
                            }
                            else {
                                setResult('User do not exist')
                            }
                        }
                    })
                });
        }
    }

    const handlePasswordChange = () => {
        const user = {
            Email: Email,
            Password: Password
        };
        if (
            Email == "" ||
            Password == ""
        ) {
            setResult("Required!");
        }
        else {
            database()
                .ref('/users')
                .once('value')
                .then(snapshot => {

                    snapshot.val().map(value => {

                        if (value != null) {
                            if (value.Email === user.Email) {
                            }
                            else {
                                setResult('User do not exist')
                            }
                        }
                    })
                });
            setModalVisible(!modalVisible);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Images.background} style={styles.containerBackground}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter your Email and new Password</Text>
                            <Text style={{ paddingHorizontal: 15, color: 'red', textAlign: 'right' }}></Text>
                            <View style={styles.Inputtext}>
                                <Image style={styles.image} source={Images.person} />
                                <TextInput
                                    placeholder="Email"
                                    name="Email"
                                    style={{ paddingBottom: 0 }}
                                    onChangeText={text => {
                                        setEmail(text);
                                    }}
                                />
                            </View>
                            <View style={styles.Inputtext}>
                                <Image style={styles.image} source={Images.lock} />

                                <TextInput
                                    style={{ paddingBottom: 0 }}
                                    placeholder="Password"
                                    name="Password"
                                    secureTextEntry={visible}
                                    onChangeText={text => {
                                        setPassword(text);
                                    }}
                                />
                                <Text style={styles.icon} onPress={handleVisibility}>
                                    <Image style={styles.image} source={visible ? Images.invisible : Images.visible} />
                                </Text>
                            </View>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={handlePasswordChange}
                            >
                                <Text style={styles.textStyle}>Submit</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <View style={styles.textContainer}>
                    <Image style={styles.image} source={Images.person} />
                    <Text onPress={handleNavigate} style={styles.text}>Create Account!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={{ paddingHorizontal: 15, color: 'red', textAlign: 'right' }}>{result}</Text>
                    <View style={styles.Inputtext}>
                        <Image style={styles.image} source={Images.person} />
                        <TextInput
                            placeholder="Email"
                            name="Email"
                            style={{ paddingBottom: 0 }}
                            onChangeText={text => {
                                setEmail(text);
                            }}
                        />
                    </View>
                    <View style={styles.Inputtext}>
                        <Image style={styles.image} source={Images.lock} />

                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="Password"
                            name="Password"
                            secureTextEntry={visible}
                            onChangeText={text => {
                                setPassword(text);
                            }}
                        />
                        <Text style={styles.icon} onPress={handleVisibility}>
                            <Image style={styles.image} source={visible ? Images.invisible : Images.visible} />
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={{ textAlign: 'center' }}>Get Started</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.forgot} onPress={handleForgot}>Forgot Password</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly'
    },
    containerBackground: {
        flex: 1,
    },
    textContainer: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    inputContainer: {
        flex: 2,
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    text: {
        paddingHorizontal: 40,
        paddingVertical: 8,
        fontFamily: 'sans-serif-medium',
        fontSize: 20,
    },
    Inputtext: {
        flexDirection: 'row',
        borderColor: 'gray',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingBottom: 5,
        marginBottom: 5
    },
    image: {
        height: 20,
        width: 20,
        position: 'absolute',
        left: 15,
        top: 12
    },
    icon: {
        height: 30,
        width: 20,
        position: 'absolute',
        right: 15,
        top: 7
    },
    button: {
        width: '100%',
        borderColor: 'gray',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 19,
        padding: 7,

    },
    forgot: {
        paddingHorizontal: 20,
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
    },
    modalView: {
        margin: 20,
        marginTop: 170,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
    }
});
