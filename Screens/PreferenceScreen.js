import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions
} from 'react-native'

import colors from '../assets/colors'
import Input from '../Components/Input'
import NewButton from '../Components/Button'
import { Slider } from 'react-native'
import Text from '../Components/Text'
import GenderSelect from '../Components/GenderSelect'
import Api from '../Api'
import RangeSlider from '@ptomasroos/react-native-multi-slider'
import Toast from "../Components/Toast"


const PreferencesScreen = props => {
  const [interest, setInterest] = useState('female')
  const [neighborhood, setNeighborhood] = useState('')
  const [ageMin, setAgeMin] = useState(20)
  const [ageMax, setAgeMax] = useState(30)
  const [distance, setDistance] = useState(15)
  const [clicked, setClicked] = useState(false)

  const context = props.navigation.state.routeName
  const sliderLength = Dimensions.get('window').width / 2

  useEffect(() => {
    const fetchData = async () => {
      const res = await Api().get('/preferences')
      if (res.status === 200) {
        const data = res.data.data.attributes
        setAgeMin(data.age_min)
        setAgeMax(data.age_max)
        setDistance(data.distance)
        setInterest(data.interested_in)
        setNeighborhood(data.neighborhood)
      }
    }
    if (context !== 'PreferencesWizzard') {
      fetchData()
    }
  }, [])

  const submitHandler = async () => {
    const payload = {
      interested_in: interest,
      neighborhood,
      age_min: ageMin,
      age_max: ageMax,
      distance
    }
    console.log(payload)
    const res = await Api().post('/preferences', payload)
    if (res.ok) {
      setClicked(true)
      setTimeout(() => {setClicked(false)}, 1000)
      props.navigation.navigate('Main')
    } else {
      Alert.alert('Error', 'Invalid data', [{ text: 'Okay' }]);
    }
  }

  const ageString = `${ageMin} - ${ageMax}`

  const onAgeChangeHandler = (values) => {
    setAgeMin(values[0])
    setAgeMax(values[1])
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS=="ios" ? "padding" : "height"} style={styles.screen}>
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.content}>
        <View style={styles.inputBox}>
          <View style={styles.section}>
            <Text style={styles.text}>Your interest</Text>
            <GenderSelect
              onChange={setInterest}
              value={interest}
              style={{ width: '100%' }}
            />
          </View>
          <View style={styles.section}>
            <Input
              label='My Neighborhood:'
              value={neighborhood}
              onChangeText={setNeighborhood}
              labelStyle={{ paddingBottom: 6 }}
              style={{ width: '80%' }}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Age Range: {ageString}</Text>
            <RangeSlider
              onValuesChange={onAgeChangeHandler}
              values={[ageMin, ageMax]}
              min={18}
              max={99}
              step={1}
              selectedStyle={{ backgroundColor: colors.lightYellow }}
              markerStyle={{ backgroundColor: colors.lightYellow }}
              containerStyle={{ height: 30 }}
              sliderLength={sliderLength}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Maximum Distance: {distance} mi.</Text>
            <RangeSlider
              onValuesChange={(values) => setDistance(values[0])}
              values={[distance]}
              min={1}
              max={30}
              step={1}
              selectedStyle={{ backgroundColor: colors.lightYellow }}
              markerStyle={{ backgroundColor: colors.lightYellow }}
              containerStyle={{ height: 30 }}
              sliderLength={sliderLength}
            />
          </View>
        </View>
        <View style={styles.buttonBox}>
          <NewButton
            style={{...styles.button,...styles.buttonSave}}
            color="white"
            onPress={submitHandler}
        >
            {context === 'PreferencesWizzard' ? 'Start matching!' : 'Save'}
        </NewButton>
        </View> 
        {clicked ? <Toast>You save the changes</Toast>:null}
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
    justifyContent:'center',
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  inputBox: {
    width: '65%',
    paddingVertical: 20
  },
  input: {
    marginVertical: 10,
    width: "100%",
    height: 40,
    backgroundColor: "white",
    color: "black",
    borderRadius: 20,
    padding: 10
  },
  buttonBox:{
    width: "100%",
    justifyContent: "center"
  },
  button:{
    width: 210,
    height: 45,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5, 
  },
  buttonSave: {
    backgroundColor: "green"
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 6
  },
  section: {
    paddingVertical: 10,
    alignItems: 'center',
  }
})

export default PreferencesScreen
