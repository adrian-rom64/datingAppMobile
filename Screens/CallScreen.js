import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Button, ShadowPropTypesIOS, Alert, NativeModules } from 'react-native'
import {RtcEngine, AgoraView} from 'react-native-agora'
import * as Permissions from 'expo-permissions'
import { NavigationActions, StackActions } from 'react-navigation';
import Text from '../Components/Text'
import colors from '../assets/colors'
import Ad from '../Components/Ad'
import CameraView from '../Components/CameraView'
import Counter from '../Components/Counter'

const {Agora} = NativeModules

const {
	FPS30,
	AudioProfileDefault,
	AudioScenarioDefault,
	Adaptive
} = Agora;

const UserProfile = (props) => {
	const [time, setTime] = useState(15)
	const [stage, setStage] = useState(1)
	const [counter, setCounter] = useState(null)
	const [preeIds, setPreeIds] = useState([])
	const [uid, setUid] = useState(Math.floor(Math.random()*100))
	const [apiid, setApiid] = useState("720beab915c548c089981f5bc0e7b8bf")
	const [chanelName, setChanelName] = useState('test')
	const [joinSuceed, setJoinSuceed] = useState(false)
	const [loading, setLoading] = useState('load')

	const config = {
		appid: apiid,
		chanelProfile: 0,
		videoEncoderConfig: {
			width: 720,
			height: 1000,
			bitrate: 1,
			frameRate: FPS30,
			orientationMode: 0
		},
		audioProfile: AudioProfileDefault,
		audioScenerio: AudioScenarioDefault,
	}

	const countDown = () => {
		setTime(time => {
			if (time > 0) {
				return time - 1
			} else {
				setCounter(counter => {
					clearInterval(counter)
					return null
				})
				return time
			}
		})
	}

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(
		  Permissions.CAMERA,
		  Permissions.AUDIO_RECORDING
		);
		if (result.status !== 'granted') {
		  Alert.alert(
			'Insufficient permissions!',
			'You need to grant camera permissions to use this app.',
			[{ text: 'Okay' }]
		  );
		  return false;
		}
		return true;
	  };
	
	  const checkPremission = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
		  return;
		}
		setCounter(setInterval(countDown, 1000))
		
		RtcEngine.on('userJoined', (data) => {
			if(preeIds.indexOf(data.uid) === -1){
				setPreeIds([...preeIds.data.uid])
			}
		})
		RtcEngine.on('userOffline', (data) => {
			setPreeIds(preeIds.filter(uid=>uid!==data.uid))
		})
		RtcEngine.on('joinChannelSuccess', (data)=> {
			RtcEngine.startPreview();
			setJoinSuceed(true)
		})
		RtcEngine.init(config)
		RtcEngine.joinChannel(chanelName, uid)
		RtcEngine.enableAudio();

	}


	const endCallHandler = () => {
		RtcEngine.leaveChannel();
		setJoinSuceed(false)
		setPreeIds([])
		RtcEngine.destroy()
		props.navigation.navigate("Main")
	}

	useEffect(() => {
		checkPremission()
		console.log(props.navigation)
	},[])

	useEffect(() => {
		if (time <= 8) setStage(2)
		if (time === 0) setStage(3)
	}, [time])

	const stage2Screen = (
		<View style={styles.hint}>
			<Text>Joe wants to know if it hurt when you fell from heaven</Text>
		</View>
	)

	const stage3Screen = (
			<AgoraView style={styles.localUserCamera} zOrderMediaOverlay={true} showLocalVideo={true} mode={1}/>
			/* remoteUid={preeIds[0]} mode={1} */
	)

	const getContent = () => {
		if (stage === 1) {
			return <Ad style={styles.ad} />
		}
		if (stage === 2) {
			return stage2Screen
		}
		if (stage === 3) {
			return stage3Screen
		}
	}

	const resetHandler = () => {
		setTime(15)
		setStage(1)
		setCounter(counter => {
			clearInterval(counter)
			return setInterval(countDown, 1000)
		})
	endCallHandler()

	}

  return (
		joinSuceed ?
		<View style={styles.screen}>
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Text style={styles.text}>Calling now, meet Joe in</Text>
					<Counter time={time} />
				</View>
				<View style={styles.camera}>
					<AgoraView style={styles.localUserCamera} zOrderMediaOverlay={true} showLocalVideo={true} mode={1}/>
				</View>
			</View>
			<View style={styles.content}>
				{getContent()}
			</View>
			<View style={styles.bar}>
				<Button onPress={resetHandler} title="End Call"/>
			</View>
		</View>: 
		<View></View>
  )
  }

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
		backgroundColor: colors.lightBlue,
		paddingTop: 30, // %TODO get navbar height
	},
	header: {
		height: '20%',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	content: {
		height: '70%',
		width: '100%',
	},
	bar: {
		height: '10%',
		backgroundColor: colors.lightBlue,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	ad: {
		width: '100%',
		height: '100%',
	},
	camera: {
		margin: 10,
		flex: 1
	},
	localUserCamera:{
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	headerContent: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 2,
	},
	text: {
		paddingBottom: 20
	},
	hint: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%'
	}
})

export default UserProfile
