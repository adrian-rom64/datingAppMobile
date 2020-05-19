/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
// import * as Font from 'expo-font'
import authReducer from './store/reducers/auth'
import DatingNavigation from './Navigation/AppNavigation'
// import * as SplashScreen from 'expo-splash-screen'
import { View, StyleSheet } from 'react-native'
import Alerts from './Components/Alerts/Alerts';
import { reducer } from './Components/Alerts/store'

const rootReducer = combineReducers({
  alert: reducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  // const [dataLoaded, setDataLoaded] = useState(false)

  // Put stuff that need to be loaded before the app start here
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await SplashScreen.preventAutoHideAsync()
  //       await Font.loadAsync({
  //         'brown-bold': require('./assets/fonts/brown-bold.ttf')
  //       })
  //       setDataLoaded(true)
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [])

  // useEffect(() => {
  //   if (dataLoaded) SplashScreen.hideAsync()
  // }, [dataLoaded])

  // if (!dataLoaded) return null

  const wrapperStyle = StyleSheet.create({
    flex: 1
  })

  return (
    <Provider store={store}>
      <View style={wrapperStyle}>
        <DatingNavigation/>
        <Alerts />
      </View>
    </Provider>
  );
}
