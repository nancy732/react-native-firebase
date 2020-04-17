import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground } from 'react-native';
import Images from '../assets/index';
import database from '@react-native-firebase/database';
export default function LoginForm({ navigation }) {
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [result, setResult] = useState()
    const [visible, setVisible] = useState(true)
    const handleVisibility = e => {
        setVisible(!visible)
    }
    const handleNavigate = e => {
        navigation.navigate("Signup");
    }
    const handleForgot = e => {
        console.log("handleForgot called")
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

    return (
        <View style={styles.container}>
            <ImageBackground source={Images.background} style={styles.containerBackground}>
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
                    <Button onPress={handleSubmit} style={styles.button}>Get Started</Button>

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
    },
    forgot: {
        paddingHorizontal: 20,
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
    }
});
