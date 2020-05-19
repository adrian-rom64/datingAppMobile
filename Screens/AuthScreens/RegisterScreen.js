import React, {useState , useEffect} from 'react'
import { View, StyleSheet, Image, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import Text from '../../Components/Text'
import {useDispatch} from 'react-redux'
import colors from '../../assets/colors'

import * as authActons from '../../store/actions/auth'

import Input from '../../Components/Input'
import NewButton from '../../Components/Button'

const twoNd = require('../../assets/icnos/2nd.png')

const dummyEmail = () => `dummy${Math.floor(Math.random() * 10000)}@test.pl`

const RegistrationScreen = props => {
    const [email, setEmail] = useState(dummyEmail())
    const [password, setPassword] = useState('qwerty')
    const [confirmpassword, setConfirmPassword] = useState('qwerty')
    const dispatch = useDispatch();
    
    const validate = () => {
        const error = (err) => {
            Alert.alert('Error', err, [{ text: 'Okay' }])
        }
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email === '') {
            error('Email field is empty')
            return false
        } 
        if (!regex.test(String(email).toLowerCase())) {
            error('Email is invalid')
            return false
        }
        if (password === '') {
            error('Password is empty')
            return false
        }
        if (password.length < 6) {
            error('Password should be 6 characters long')
            return false
        }
        if (confirmpassword === '') {
            error('Password confirmation is empty')
            return false
        }
        if (password !== confirmpassword) {
            error('Passwords are not the same')
            return false
        }
        return true
    }

    const signup = async () => {
        if (!validate()) return

        const data = authActons.signup(email, password)
        try {
            await dispatch(data)
            props.navigation.navigate('SettingsWizzard')
        } catch (error){
            if (error.message === 'same-email') {
                Alert.alert('Error', 'Email has already been taken', [{ text: 'Okay' }])
            } else {
                Alert.alert('Error', 'Invalid data', [{ text: 'Okay' }])
            }
        }
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS=="ios" ? "padding" : "height"} style={styles.screen}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.content}>
                <View style={styles.logo}>
                        <View style={styles.appName}>
                            <Image source={twoNd} style={styles.twoNd} />
                            <Text style={styles.logoText}>Date</Text>
                        </View>
                        <Text style={styles.logoBottomText}>"Never need a 1st Date Again"</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Input label='Email' value={email} onChangeText={setEmail} email keyboardType='email-address'/>
                        <Input label='Password' value={password} onChangeText={setPassword} password secureTextEntry/>
                        <Input label='Re-Type Password' value={confirmpassword} onChangeText={setConfirmPassword} password secureTextEntry/>
                    </View>
                    <View style={styles.buttonBox}>
                        <NewButton style={{...styles.button,...styles.buttonLogin}} color="white" onPress={signup}>Signup</NewButton>
                    </View>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}} style={styles.registerBox}>
                            <Text style={styles.register}>Signin</Text>
                    </TouchableOpacity>  
                </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: colors.lightBlue,
        width: "100%",
        height: "100%",
        marginTop: 10,
    },
    logo: {
        marginVertical: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    logoText: {
        color: "black",
        fontSize: 40,
        fontWeight: "600"
    },
    logoBottomText : {
        color: 'black',
        fontSize: 16
    },
    inputBox: {
        width: "65%",
        marginBottom: 20,
    },
    input: {
        marginVertical: 10,
        width: "100%",
        height: 40,
        backgroundColor: "white",
        color: "black",
        borderRadius: 20,
        padding: 10,
        height: Dimensions.get("window").width * 0.7,
    },
    buttonBox:{
        width: "50%",
    },
    button:{
        width: 150,
        height: 40,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5, 
    },
    buttonLogin: {
        backgroundColor: "green"
    },
    appName: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    twoNd: {
        width: 35,
        height: 35,
        marginTop: 6
    },
    registerBox: {
        width: "90%",
        textAlign: "left",
        height: Dimensions.get("window").width * 0.25,
        justifyContent: "flex-end",
    },
    register : {
        fontSize: 17,
        letterSpacing: 2,
        marginLeft: 10,
    }

})

export default RegistrationScreen
