import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../assets/colors'

const GenderSelect = props => {

  const colorFor = (gender) => gender === props.value ? colors.lightYellow : props.color

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableOpacity onPress={() => props.onChange('male')}>
        {/* <MaterialCommunityIcons name="gender-male" size={props.iconSize} color={colorFor('male')}/> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onChange('female')}>
        {/* <MaterialCommunityIcons name="gender-female" size={props.iconSize} color={colorFor('female')}/> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onChange('both')}>
        {/* <MaterialCommunityIcons name="gender-male-female" size={props.iconSize} color={colorFor('both')}/> */}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
})

GenderSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOf(['female', 'male', 'both']),
  style: PropTypes.object,
  color: PropTypes.string,
  iconSize: PropTypes.number
}

GenderSelect.defaultProps = {
  onChange: () => {},
  value: 'female',
  style: {},
  color: '#444',
  iconSize: 40
}

export default GenderSelect
