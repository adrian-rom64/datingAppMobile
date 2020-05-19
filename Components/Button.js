import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Text from './Text'

const Button = props => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                    <View style={{...styles.button, ...props.style}}>
                        <Text style={{...styles.buttonText, color: props.color}}>{props.children}</Text>
                    </View>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 13,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: '500',
        fontSize: 17
    }
})

export default Button
