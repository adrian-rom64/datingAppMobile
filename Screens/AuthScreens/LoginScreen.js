import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Alert, Image,TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions} from 'react-native'
import Text from '../../Components/Text'
import {useDispatch} from 'react-redux'
// import {FontAwesome} from '@expo/vector-icons'
import colors from '../../assets/colors'

import * as authActons from '../../store/actions/auth'

import NewButton from '../../Components/Button'
import Input from '../../Components/Input'
const twoNd = require('../../assets/icnos/2nd.png')

const LoginScreen = props => {
    const [email, setEmail] = useState('dummy@test.pl')
    const [password, setPassword] = useState('qwerty')
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
        return true
    }

    const login = async () => {
        if (!validate()) return

        try {
            await dispatch(authActons.login(email, password))
            props.navigation.navigate('Dating')
        } catch(err) {
            Alert.alert('Error', 'Email and password are invalid', [{ text: 'Okay' }])
        }
    } 


    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <KeyboardAvoidingView behavior={Platform.OS=="ios" ? "padding" : "height"} style={styles.screen}>
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

                        </View>
                        <View style={styles.buttonBox}>
                            <NewButton style={{...styles.button,...styles.buttonLogin}} color="white" onPress={login}>Singin</NewButton>
                        </View>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}} style={styles.registerBox}>
                            <Text style={styles.register}>Signup</Text>
                        </TouchableOpacity> 
                        </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBlue,
    },
    content:{
        width: "100%",
        height: "90%",
        justifyContent: "center",
        alignItems:'center',
        marginTop: 50
    },

    inputBox: {
        width: "65%",
        marginBottom: 10,
        height: Dimensions.get("window").width* 0.5,

    },
    buttonBox:{
        width: "50%",
    },
    buttonBox:{
        width: "50%",
        marginBottom: 50
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
    registerBox: {
        width: "90%",
        textAlign: "left",
        justifyContent: "flex-end",
        height: Dimensions.get("window").width * 0.24,

    },
    register : {
        fontSize: 17,
        letterSpacing: 2,
        marginLeft: 10,
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
    appName: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    twoNd: {
        width: 35,
        height: 35,
        marginTop: 6
    }

})

export default LoginScreen
