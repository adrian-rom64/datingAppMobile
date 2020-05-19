import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Ad = (props) => {
  return (
    <View style={{ ...styles.ad, ...props.style }}>
      <Text style={styles.text}>Ad</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ad: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
})

export default Ad
