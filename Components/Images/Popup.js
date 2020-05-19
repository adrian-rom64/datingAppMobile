import React from 'react'
import { View, StyleSheet, Modal, Image, Dimensions, TouchableOpacity } from 'react-native'
import Text from '../../Components/Text'
import PropTypes from 'prop-types'
import { FontAwesome5 } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

const Popup = (props) => {

  const deleteHandler = () => {
    props.deleteHandler()
    props.hide()
  }
  
  const setAsMainHandler = () => {
    props.setAsMainHandler()
    props.hide()
  }

  return (
    <Modal>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.hide}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.url }} />
          </View>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity onPress={deleteHandler}>
            <View style={styles.action}>
              <FontAwesome5 name="trash-alt" color="#ccc" size={30}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={setAsMainHandler}>
            <View style={styles.action}>
              <Text style={styles.text}>Set as profile picture</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    height: '90%',
    width: '100%',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width,
    height: width
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '10%',
    width: '100%'
  },
  action: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  delete: {
    marginRight: 20,
    borderRightWidth: 4,
    borderRightColor: '#ccc'
  },
  text: {
    color: '#ccc',
    fontSize: 18
  }
})

Popup.propTypes = {
  hide: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  setAsMainHandler: PropTypes.func.isRequired
}

export default Popup
