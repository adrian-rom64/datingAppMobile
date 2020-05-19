import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'

const Toast = props => {

    
    
    return (
            <View style={styles.screen}>
                <Text style={styles.text}>{props.children}</Text>
            </View>

    );
}

const styles = StyleSheet.create({
    screen: {
        height: 45,
        width: 250,
        backgroundColor: "rgba(128,128,128,0.8)",
        borderRadius: 25,
        zIndex: 1000,
        position: 'absolute',
        bottom: 10,
        justifyContent:"center",
        alignItems: "center",
    },
    text:{
        fontSize: 16,
        color: "white"
    }
})

export default Toast
