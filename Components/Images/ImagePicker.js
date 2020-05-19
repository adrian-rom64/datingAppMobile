import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import Api from '../../Api'
import Popup from './Popup'

const ImagePicker = props => {
  const [showModal, setShowModal] = useState(false)

  let uri = ''
  if (props.url) {
    uri = props.url.replace('localhost', Api().hostname)
  }

  const empty = <Text style={styles.plus}>+</Text>
  const image = <Image style={styles.image} source={{ uri }} />
  const loading = <ActivityIndicator size="large" color="red"/>

  const modal = (
    <Popup
      url={uri}
      hide={() => setShowModal(false)}
      deleteHandler={props.deleteHandler}
      setAsMainHandler={props.setAsMainHandler}
    />
  )

  const onPress = props.url ? () => setShowModal(true) : props.uploadHandler

  return (
    <React.Fragment>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={props.main ? styles.mainImage : styles.imagePreview}>
          {props.url ? image : (props.loading ? loading : empty)}
        </View>
      </TouchableOpacity>
      {showModal ? modal : null}
    </React.Fragment>

  )
}
  
const styles = StyleSheet.create({
  imagePreview: {
    width: 105,
    height: 105,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    overflow: "hidden"
  },
  mainImage: { // %TODO Make it shorter
    width: 105,
    height: 105,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: '#FF851B'
  },
  plus: {
    fontSize: 35,
    fontWeight: "bold",
    color: "grey"
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

ImagePicker.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  main: PropTypes.bool,
  loading: PropTypes.bool,
  uploadHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  setAsMainHandler: PropTypes.func.isRequired,
  position: PropTypes.number
}

export default ImagePicker
