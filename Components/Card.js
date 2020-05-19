import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    backgroundColor: "white",
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 6, 
    borderRadius: 8,
    width: "90%",
  },
})

export default Card
