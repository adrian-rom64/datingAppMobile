import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const UserImage = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Image source={{ uri: props.src }} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  }
})

UserImage.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
}

UserImage.defaultProps = {
  style: {},
}

export default UserImage
