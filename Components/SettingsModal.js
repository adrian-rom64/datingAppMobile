import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native'
import colors from '../assets/colors'
// import { Feather } from '@expo/vector-icons'
// import { Octicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const iconSize = Math.floor(Dimensions.get('window').width / 3)
const dividerHeight = Math.floor(Dimensions.get('window').height / 100)

const SettingsModal = props => {

  const editProfileHandler = () => {
    props.onChooseOption('profile')
  }

  const editPreferencesHandler = () => {
    props.onChooseOption('preferences')
  }

  if (!props.visible) return null

  return (
    <Modal style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.options}>
          <TouchableOpacity onPressOut={editProfileHandler}>
            <View style={styles.option}>
              <Text style={styles.label}>Edit Profile</Text>
              {/* <Feather name="edit" color={colors.lightBlack} size={iconSize} /> */}
            </View>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity onPressOut={editPreferencesHandler}>
            <View style={styles.option}>
              {/* <Octicons name="settings" color={colors.lightBlack} size={iconSize} /> */}
              <Text style={styles.label}>Preferences</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    width: '60%'
  },
  option: {
    marginVertical: 14,
    alignItems: "center",
  },
  divider: {
    height: dividerHeight,
    width: '100%',
    backgroundColor: colors.lightBlack,
    borderRadius: dividerHeight
  },
  label: {
    marginVertical: 6,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

SettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onChooseOption: PropTypes.func.isRequired,
}

export default SettingsModal
