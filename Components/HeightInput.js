import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

const parseHeight = (feet, inches) => {
  if (!feet || feet === '') {
    feet = '0'
  }
  if (!inches || inches === '') {
    inches = '00'
  }
  if (inches.length === 1) {
    inches = `0${inches}`
  }
  return `${feet}"${inches}'`
}

const HeightInput = (props) => {

  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')

  useEffect(() => {
    props.onChange(parseHeight(feet, inches))
  }, [feet, inches])

  useEffect(() => {
    if (props.value.length !== 5 || props.value === '0"00\'') {
      setFeet('')
      setInches('')
      return
    }
    setFeet(props.value[0])
    setInches(props.value.substring(2,4))
  }, [props.value])

  const placeholder = (
    <TextInput
      placeholder='Height'
      keyboardType='number-pad'
      maxLength={1}
      onChangeText={setFeet}
    />
  )

  if (feet === '' && inches === '') return placeholder

  return (
    <View style={styles.text}>
      <TextInput
        keyboardType='number-pad'
        maxLength={1}
        style={{ width: 10 }}
        value={feet}
        onChangeText={setFeet}
      />
      <Text>"</Text>
      <TextInput
        keyboardType='number-pad'
        maxLength={2}
        style={{ width: 20 }}
        value={inches}
        onChangeText={setInches}
      />
      <Text>'</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flexDirection: 'row'
  }
})

export default HeightInput
