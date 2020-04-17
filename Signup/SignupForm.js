import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Button } from 'react-native';
import Images from '../assets/index';
import database from '@react-native-firebase/database';

export default function SignupForm({ navigation }) {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Pincode, setPincode] = useState("");
    const [Password, setPassword] = useState("");
    const [Confirm, setConfirmPassword] = useState("");
    const [toggle, setToggle] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        sixth: false,
    });
    const [result, setResult] = useState()
    const [num, setNum] = useState()
    const [visible, setVisible] = useState(true)
    const [visibleConfirm, setVisibleConfirm] = useState(true)
    const handleVisibility = e => {
        setVisible(!visible)
    }
    const handleVisibilityConfirm = e => {
        setVisibleConfirm(!visibleConfirm)
    }
    const isEmailValid = () => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(Email).toLowerCase());
    };
    const isPasswordValid = () => {
        let pattern = /^(([0-9]{6,12}))$/
        return pattern.test(String(Password).toLowerCase());
    }
    const isPincodeValid = () => {
        let pattern = /^(([0-9]{6}))$/
        return pattern.test(String(Password).toLowerCase());
    }
    const isPhoneNumberValid = () => {
        let pattern = /^(([0-9]{10}))$/
        return pattern.test(String(Password).toLowerCase());
    }
    useEffect(() => {
        database()
            .ref('/users')
            .once('value')
            .then(snapshot => {
                setNum(snapshot.val().length)
            })
    }, [num])

    const handleSubmit = res => {
        const user = {
            Name: Name,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Pincode: Pincode,
            Password: Password,
            Confirm: Confirm
        };
        if (
            Name == "" ||
            Email == "" ||
            PhoneNumber == "" ||
            Pincode == "" ||
            Password == "" ||
            Confirm == ""
        ) {
            setResult("All the fields are Required!");
        }
        else if (Password !== Confirm) {
            setResult('Password do not match')
        }
        else if (isEmailValid() == "") {
            setResult("Invalid Email");
        }
        else if (isPasswordValid() == "") {
            setResult("Password must be of 6-12 digit");
        }
        else if (isPhoneNumberValid() == "") {
            setResult("PhoneNumber must be of 10 digit");
        }
        else if (isPincodeValid() == "") {
            setResult("Pincode must be of of 6 digit");
        }
        else {
            database()
                .ref('/users')
                .once('value')
                .then(snapshot => {
                    snapshot.val().map(value => {
                        if (value != null) {
                            if (value.Email === user.Email) {
                                setResult('user already exist!')
                            }
                        }
                    })
                })
            if (result !== 'user already exist!') {
                database()
                    .ref(`/users/${num}`)
                    .set({
                        Name: user.Name,
                        Email: user.Email,
                        PhoneNumber: user.PhoneNumber,
                        Pincode: user.Pincode,
                        Password: user.Password,
                        Confirm: user.Confirm
                    })
                    .then(() => navigation.navigate('Login'));
            }
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={Images.background} style={styles.containerBackground}>
                <View style={styles.textContainer}>
                </View>

                <View style={styles.inputContainer}>
                    <Text
                        style={{ color: 'red', textAlign: 'center' }}
                    >{result}</Text>
                    <View style={styles.Inputtext}>
                        <Text style={styles.label}>{toggle.first ? 'Name' : ''}</Text>
                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="Name"
                            name="Name"
                            onChangeText={text => {
                                setName(text);
                                setToggle({
                                    ...toggle,
                                    first: text !== '',
                                });
                            }}
                        />
                    </View>
                    <View style={styles.Inputtext}>
                        <Text style={styles.label}>{toggle.second ? 'Email' : ''}</Text>
                        <TextInput
                            placeholder="Email"
                            name="Email"
                            style={{ paddingBottom: 0 }}
                            onChangeText={text => {
                                setEmail(text);
                                setToggle({
                                    ...toggle,
                                    second: text !== '',
                                });
                            }}
                        />
                    </View>
                    <View style={styles.Inputtext}>
                        <Text style={styles.label}>{toggle.third ? 'Phone Number' : ''}</Text>
                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="PhoneNumber"
                            name="PhoneNumber"
                            onChangeText={text => {
                                setPhoneNumber(text);
                                setToggle({
                                    ...toggle,
                                    third: text !== '',
                                });
                            }}
                        />
                    </View>
                    <View style={styles.Inputtext}>
                        <Text style={styles.label}>{toggle.fourth ? 'Pincode' : ''}</Text>
                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="Pincode"
                            name="Pincode"
                            onChangeText={text => {
                                setPincode(text);
                                setToggle({
                                    ...toggle,
                                    fourth: text !== '',
                                });
                            }}
                        />
                    </View>
                    <View style={styles.Inputtext}>
                        <Text style={styles.label}>{toggle.fifth ? 'Password' : ''}</Text>
                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="Password"
                            name="Password"
                            secureTextEntry={visible}
                            onChangeText={text => {
                                setPassword(text);
                                setToggle({
                                    ...toggle,
                                    fifth: text !== '',
                                });
                            }}
                        />
                        <Text style={styles.button} onPress={handleVisibility}>
                            <Image style={styles.image} source={visible ? Images.invisible : Images.visible} />
                        </Text>
                    </View>
                    <View style={styles.Inputtext}>
                        <Text style={styles.label}>
                            {toggle.sixth ? 'Confirm Password' : ''}
                        </Text>
                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="Confirm Password"
                            name="Confirm"
                            secureTextEntry={visibleConfirm}
                            onChangeText={text => {
                                setConfirmPassword(text);
                                setToggle({
                                    ...toggle,
                                    sixth: text !== '',
                                });
                            }}
                        />
                        <Text style={styles.button} onPress={handleVisibilityConfirm}>
                            <Image style={styles.image} source={visibleConfirm ? Images.invisible : Images.visible} />
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} title="Create Account" />
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
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputContainer: {
        flex: 6,
        alignContent: 'flex-start',
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    text: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 3,
        borderTopWidth: 2.5,
        paddingHorizontal: 20,
        paddingVertical: 7,
        fontFamily: 'sans-serif-medium',
        fontSize: 20,

    },
    Inputtext: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingHorizontal: 2,
    },
    image: {
        height: 20,
        width: 20,
    },
    label: {
        position: 'absolute',
        top: -7,
        left: 5,
        zIndex: 1,
    },
    button: {
        height: 30,
        width: 20,
        position: 'absolute',
        right: 10,
        top: 10
    }
});
