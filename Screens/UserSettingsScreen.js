import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, TextInput, Alert} from 'react-native'
import colors from '../assets/colors'
import { Header, useHeaderHeight } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Api from '../Api'
import UserImages from '../Components/Images/Container'


import Text from '../Components/Text'

import NewButton from '../Components/Button'
import Card from '../Components/Card'
import IconWithInput from '../Components/IconWithInput'
import HeightInput from '../Components/HeightInput';
import Toast from "../Components/Toast"


const UserSettingsScreen = props => {
    const context = props.navigation.state.routeName

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [hometown, setHometown] = useState('')
    const [work, setWork] = useState('')
    const [education, setEducation] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [about, setAbout] = useState('')
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await Api().get('/accounts')
            if (res.status === 200) {
                const data = res.data.data.attributes
                setName(data.name)
                setLocation(data.lives_in)
                setHometown(data.hometown)
                setWork(data.work)
                setEducation(data.education)
                setAge(data.age.toString())
                setHeight(data.height)
                setAbout(data.about)
            }
        }
        if (context !== 'SettingsWizzard') {
            fetchData()
        }
    }, [])

    const alert = (text) => {
        Alert.alert('Error', text, [{ text: 'Okay' }])
    }

    const validate = () => {
        const ageNum = parseInt(age)
        if (isNaN(ageNum)) {
            alert('Invalid age')
            return false
        }
        if (ageNum < 18) {
            alert('Minimal age is 18')
            return false
        }
        if (ageNum > 99) {
            alert('Maximal age is 99')
            return false
        }
        if (name === '') {
            alert('Fill in Your name')
            return false
        }
        return true
    }

    const forward = () => {
        if (context === 'SettingsWizzard') {
            props.navigation.navigate('PreferencesWizzard')
        } else {
            props.navigation.navigate('Main')
        }
    }

    const submitHandler = async () => {
        if (!validate()) return

        const payload = {
            name,
            hometown,
            work,
            education,
            age,
            height,
            about,
            gender: 'male',
            lives_in: location
        }

        const res = await Api().post('/accounts', { account: payload })
        if (res.ok) {
            setClicked(true)
            setTimeout(() => {setClicked(false)}, 1000)
            forward()
        } else {
            setClicked(true)
            setTimeout(() => {setClicked(false)}, 1000)
            alert('Invalid data')
        }
    }

    return (
        <ScrollView style={styles.screen}>
       <KeyboardAwareScrollView style={styles.content}>
                <TextInput
                    placeholder="Name"
                    onChangeText={setName}
                    style={styles.nameInput}
                    placeholderTextColor={'black'}
                    value={name}
                />
                <Text style={styles.text}>Upload Profile Photos Below:</Text>
                <UserImages />
                <Text style={styles.text}>Let people know about you below:</Text>
                <View style={styles.userInformation}>
                    <Card style={{...styles.card,...styles.userInfoCard}}>
                    <View style={styles.userInfoLeft}>
                        <IconWithInput
                            icon="map-marker-alt"
                            placeholder="Location"
                            value={location}
                            onChangeText={setLocation}
                        />
                        <IconWithInput
                            icon="home"
                            placeholder="Hometown"
                            value={hometown}
                            onChangeText={setHometown}
                        />
                        <IconWithInput
                            icon="briefcase"
                            placeholder="Work"
                            value={work}
                            onChangeText={setWork}
                        />
                        <IconWithInput
                            icon="graduation-cap"
                            placeholder="Education"
                            value={education}
                            onChangeText={setEducation}
                        />
                    </View>
                    <View style={styles.userInfoRight}>
                        <View style={styles.age}>
                        <TextInput
                            placeholder="Age"
                            keyboardType={"number-pad"}
                            style={styles.input}
                            placeholderTextColor={"grey"}
                            value={age}
                            onChangeText={setAge}
                        />
                        </View>
                        <View style={styles.height}>
                        <HeightInput
                            onChange={setHeight}
                            value={height}
                        />
                        </View>
                    </View>
                    </Card>
                </View>
                <View style={styles.userDescription}>
                    <Card style={{...styles.card,...styles.descriptionCard}}>
                        <Text style={styles.descTitle}>Elevator Pitch:</Text>
                        <TextInput
                            style={styles.textArea} 
                            placeholder="140 characters that descripe your awsomeness. How would your friends describe you ?" 
                            placeholderTextColor={"grey"}
                            maxLength={140}
                            numberOfLines={5} 
                            multiline={true}
                            value={about}
                            onChangeText={setAbout}
                        />
                    </Card>
                </View>
                <View style={styles.buttonBox}>
                <NewButton
                    style={{...styles.button,...styles.buttonSave}}
                    color="white"
                    onPress={submitHandler}
                >
                    {context === 'SettingsWizzard' ? 'Next' : 'Save'}
                </NewButton>
                </View>
                <View style={{width: "100%", alignItems: "center"}}>
                {clicked ? <Toast>You save the changes</Toast>:null}
                </View>
                </KeyboardAwareScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.lightBlue,
    },
    content: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 10,
        paddingBottom: 20,
    },
    nameInput: {
        fontSize: 25
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        marginVertical: 10
    },
    imagePickerBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center'
    },
    userInformation:{
        justifyContent: "center",
        alignItems: 'center'
    },
    card: {
        width: "100%",
        height: 130
    },
    userInfoCard:{
        flexDirection: 'row',
    },
    userInfoLeft: {
        flex: 4,
        justifyContent: "center",
	},
	userInfoRight: {
		borderLeftColor: "grey",
		borderLeftWidth: 2,
		flex: 1,
		justifyContent: 'space-around',
		paddingLeft: 8
    },
    age: {
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    height: {
        borderTopWidth: 1,
        borderTopColor: "grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    userDescription: {
        marginVertical: 25
    },
    descriptionCard:{
        alignItems: "center",
        height: 110
    },
    descTitle: {
        fontSize: 15,
        fontWeight: "bold"
    },
    textArea: {
        paddingHorizontal: 20,
        textAlign: "center",
        fontSize: 15,
        fontWeight: '500'
    },
    buttonBox:{
        width: "100%",
        justifyContent: "center",
        height: 80

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
    buttonSave: {
        backgroundColor: "green"
    },
})

export default UserSettingsScreen