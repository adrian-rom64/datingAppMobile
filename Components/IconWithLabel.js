import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from './Text'
import PropTypes from 'prop-types'
// import { FontAwesome5 } from '@expo/vector-icons'
import colors from '../assets/colors'

const IconWithLabel = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.icon}>
				{/* <FontAwesome5 name={props.icon} color={colors.lightBlack} size={18} /> */}
			</View>
			<Text style={styles.text}>{props.label}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	icon: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		flex: 8,
		paddingLeft: 5,
		lineHeight: 24,
	}
})

IconWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
}

export default IconWithLabel
