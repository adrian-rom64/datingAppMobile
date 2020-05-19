import React from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import colors from '../assets/colors'

import RegisterScreen from '../Screens/AuthScreens/RegisterScreen'
import MatchesScreen from '../Screens/MatchesScreen'
import UserSettingsScreen from '../Screens/UserSettingsScreen'
import MainScreen from '../Screens/MainScreen'
import PreferencesScreen from '../Screens/PreferenceScreen'
import UserProfileScreen from  '../Screens/UsersProfileScreen'
import CallScreen from '../Screens/CallScreen'
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import SettingsMenu from '../Screens/SettingsMenu'

const twoNd = require('../assets/icnos/2nd.png')
const heart = require('../assets/icnos/heart.png')
const settings = require('../assets/icnos/settings.png')
const cameraGreen = require('../assets/icnos/camera-green.png')

const iconStyle = {
    width: 25,
    height: 25,
    resizeMode: 'contain'
}

const navigatorMiddleware = ({ navigation, defaultHandler }) => {
    if (navigation.state.routes.length > 1) {
        if (navigation.state.routeName === 'Matches') {
            navigation.navigate('MatchesList')
        }
        if (navigation.state.routeName === 'UserSettings') {
            navigation.navigate('Menu')
        }
    }
    defaultHandler()
}

const MainScreenNavigation = createStackNavigator({
    Main: MainScreen
},{ headerMode: 'none' })

const SettingsScreenNavigation = createStackNavigator({
    Menu: SettingsMenu,
    Settings: UserSettingsScreen,
    Preferences: PreferencesScreen
},{ headerMode: 'none' })

const MatchesScreenNavigation = createStackNavigator({
    MatchesList: MatchesScreen,
    Profile: UserProfileScreen
})

const CallScreenNavigation = createStackNavigator({
    Call: CallScreen
}, {
    navigationOptions: {
        tabBarVisible: false
    },
    headerMode: 'none'
})

const AuthScreenNavigation = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    SettingsWizzard: UserSettingsScreen,
    PreferencesWizzard: PreferencesScreen
},{ headerMode: 'none' })

const tabScreenConfig = {
    MainScreen: {
        screen: MainScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Image source={twoNd} style={iconStyle}/>
            },
            tabBarColor: "white"
        }
    },
    Matches: {
        screen: MatchesScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Image source={heart} style={iconStyle}/>
            },
            tabBarColor: "white"
        }
    },
    UserSettings: {
        screen: SettingsScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Image source={settings} style={iconStyle} />
            },
            tabBarColor: "white",
        }
    },
    Video: {
        screen: CallScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Image source={cameraGreen} style={iconStyle} />
            },
            tabBarColor: "white",
        }
    },
}

const DatingTabNavigator = createBottomTabNavigator(tabScreenConfig, {
    defaultNavigationOptions: {
        tabBarOnPress: navigatorMiddleware
    },
    tabBarOptions: {
        activeTintColor: 'black',
        activeBackgroundColor: colors.lightBlue,
        inactiveBackgroundColor: colors.lightYellow,
        showLabel: false,
        style: { height: 70},
        safeAreaInset: { bottom: 'never', top: 'never' },
    }, 
})

const MainNavigation = createSwitchNavigator({
    Auth: AuthScreenNavigation,
    Dating: DatingTabNavigator
})

export default createAppContainer(MainNavigation)
