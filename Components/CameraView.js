import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../assets/colors'

const CameraView = (props) => {

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text>Camera</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightYellow,
    color: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
})

export default CameraView
