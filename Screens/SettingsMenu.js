import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Text from '../Components/Text'
import colors from '../assets/colors'
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

const iconSize = Math.floor(Dimensions.get('window').width / 5.5)
const dividerHeight = Math.floor(Dimensions.get('window').height / 150)

const SettingsMenu = props => {
  const editProfileHandler = () => {
    props.navigation.navigate('Settings')
  }

  const editPreferencesHandler = () => {
    props.navigation.navigate('Preferences')
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.options}>
          <TouchableOpacity onPressOut={editProfileHandler}>
            <View style={styles.option}>
              <Text style={styles.label}>Edit Profile</Text>
              <Feather name="edit" color={colors.lightBlack} size={iconSize} />
            </View>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity onPressOut={editPreferencesHandler}>
            <View style={styles.option}>
              <Octicons name="settings" color={colors.lightBlack} size={iconSize} />
              <Text style={styles.label}>Preferences</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  container: {
    backgroundColor: colors.lightBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  options: {
    width: '60%'
  },
  option: {
    marginVertical: 14,
    alignItems: 'center',
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

export default SettingsMenu
