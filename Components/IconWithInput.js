import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesome5 } from '@expo/vector-icons'

const IconWithInput = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.icon}>
				<FontAwesome5 name={props.icon} color={"grey"} size={18} />
			</View>
			<TextInput
				placeholder={props.placeholder}
				style={styles.input}
				placeholderTextColor={"grey"}
				onChangeText={props.onChangeText}
				value={props.value}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: '25%'
	},
	icon: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		flex: 7,
				fontWeight: "500",
				padding: 0,
    },
    
})

export default IconWithInput
