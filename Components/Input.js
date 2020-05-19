import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import Text from './Text'

const Input = (props) => {

    return(
        <View style={{ ...styles.screen, ...props.style }}>
            <Text style={{ ...styles.label, ...props.labelStyle }}>{props.label}</Text>
            <TextInput value={props.value} onChangeText={props.onChangeText} autoCapitalize='none' {...props} style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        marginVertical: 10
    },
    label: {
        fontSize: 17,
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 15
    }
})

export default Input