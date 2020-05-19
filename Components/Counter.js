import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from '../Components/Text'
import PropTypes from 'prop-types'

const Counter = (props) => {
  let text = Math.floor(props.time).toString()
  if (text.length === 1) {
    text = `0${text}`
  }
  
  return (
    <View style={{ ...styles.counter, ...props.style }}>
      <Text style={styles.text}>0:{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  counter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28
  }
})

Counter.propTypes = {
  time: PropTypes.number.isRequired
}

export default Counter
