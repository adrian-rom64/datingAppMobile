import React from 'react'
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native'
// import {FontAwesome, Entypo, MaterialCommunityIcons} from '@expo/vector-icons'

import test from '../assets/test.jpg'
import test2 from '../assets/test2.jpg'

const Test = props => {
    return (
            <View style={styles.screen}>
                <ScrollView horizontal>
                    <Image style={styles.image} source={test}/>
                    <Image style={styles.image} source={test}/>
                </ScrollView>
            </View>

    );
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: '100%'
    },
    image: {
        height: 200,
        width: Dimensions.get("window").width
    }
})

export default Test