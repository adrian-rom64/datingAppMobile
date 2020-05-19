import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Text from '../Components/Text'
import MatchItem from '../Components/MatchItem'
import colors from '../assets/colors'

const MatchesScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
            <MatchItem onSelect={() => props.navigation.navigate('Profile')}/>
            <MatchItem cam={1} onSelect={() => props.navigation.navigate('Profile')} startCall={() => props.navigation.navigate('Main')}/>
            <MatchItem cam={1} onSelect={() => props.navigation.navigate('Profile')} startCall={() => props.navigation.navigate('Main')}/>
            <MatchItem onSelect={() => props.navigation.navigate('Profile')}/>
            <MatchItem onSelect={() => props.navigation.navigate('Profile')}/>
            <MatchItem cam={1} onSelect={() => props.navigation.navigate('Profile')} startCall={() => props.navigation.navigate('Main')}/>
            </View>
        </ScrollView>
    );
}

MatchesScreen.navigationOptions = {
    headerTitle:() => <Text style={styles.matchTitle}>Match Queue</Text>,
    headerStyle: {
        backgroundColor: colors.lightYellow,
    },
    headerTitleAlign : "center"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    matchTitle: {
        fontSize: 22,
        fontWeight: "bold"
    } 
})

export default MatchesScreen