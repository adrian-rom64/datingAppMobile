import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Text from './Text'

import camera from '../assets/icnos/camera-green.png'
import test from '../assets/test.jpg'

const MatchesItem = props => {
    return (
        <TouchableOpacity style={styles.touchaleCmp} onPress={props.onSelect} useForeground>
            <View style={styles.screen}>
                    <Image style={styles.image}  source={test}/>
                    <View style={styles.infoBox}>
                        <Text style={styles.MatchName}>Jose, 21</Text>
                        <Text style={styles.MatchInfo}>ZocDoc, intern</Text>
                        <Text style={styles.MatchInfo}>From: Boston, NA</Text>
                    </View>
                <View style={styles.cameraBox}>{props.cam == 1 ? (
                        <TouchableOpacity onPress={props.startCall}>
                        <Image source={camera} style={styles.camera}/>
                        </TouchableOpacity>)
                        : null}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchaleCmp:{
        width: "100%"
    },
    screen: {
        flexDirection: "row",
        alignItems: 'center',
        height:100,
        width: "100%",
        backgroundColor: "white",
        marginVertical: 2,
        paddingHorizontal: 10,
        zIndex: 1,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 20
    },
    infoBox:{
        width: "60%"
    },
    MatchName:{
        fontWeight: "bold",
        fontSize: 19
    },
    MatchInfo: {
        fontSize: 14,
        color: "gray"
    },
    cameraBox:{
        zIndex: 0
    },
    camera: {
        height: 40,
        width: 40
    }
})

export default MatchesItem