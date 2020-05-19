import React from 'react'
import {View, StyleSheet,ScrollView } from 'react-native'
import Text from '../Components/Text'
import colors from '../assets/colors'
import UserImage from '../Components/UserImage'
import Card from '../Components/Card'
import { loremIpsum } from '../assets/variables'
import IconWithLabel from '../Components/IconWithLabel'

const testImageUrl1 = 'https://picsum.photos/id/1005/300'
const testImageUrl2 = 'https://picsum.photos/id/237/300'

const CardItem = props => {
        return (
            <ScrollView>
			<View style={styles.content}>
				<View style={styles.userNameContainer}>
					<Text style={styles.userNameText}>Joey</Text>
				</View>
				<UserImage src={testImageUrl1} style={styles.section}/>
				<Card style={styles.section}>
					<View style={styles.userInfo}>
						<View style={styles.userInfoLeft}>
							<IconWithLabel label="Queens, NY" icon="map-marker-alt" />
							<IconWithLabel label="Boston, MA" icon="home" />
							<IconWithLabel label="Finance" icon="briefcase" />
							<IconWithLabel label="University of Virginia" icon="graduation-cap" />
						</View>
						<View style={styles.userInfoRight}>
							<View style={styles.userInfoRightUpper}>
								<Text style={styles.text}>30</Text>
							</View>
							<View style={styles.userInfoRightLower}>
								<Text style={styles.text}>5'11"</Text>
							</View>
						</View>
					</View>
				</Card>
				<Card style={{...styles.section,...styles.descriptionCard}}>
					<Text style={styles.descTitle}>Elevator Pitch:</Text>
					<Text style={styles.text}>{loremIpsum.substring(0,200)}</Text>
				</Card>
				<UserImage src={testImageUrl2} style={styles.section}/>
			</View>
            </ScrollView>
            )
    }
    
    const styles = StyleSheet.create({
        screen: {
            backgroundColor: colors.lightBlue,
        },
        content: {
        alignItems: 'center',
            height: '100%',
            backgroundColor: colors.lightBlue,
            padding: 10
        },
        userNameContainer: {
            alignItems: "flex-start",
            width: "100%",
            marginTop: 45,
            marginBottom: 10
        },
        userNameText: {
            fontSize: 24,
            fontWeight: "bold"
        },
        section: {
            marginVertical: 6,
            width: '100%',
        },
        userInfo: {
            flexDirection: 'row',
        },
        userInfoLeft: {
            flex: 4,
        },
        userInfoRight: {
            borderLeftColor: colors.lightBlack,
            borderLeftWidth: 2,
            flex: 1,
            justifyContent: 'space-around',
            paddingLeft: 8
        },
        userInfoRightLower: {
        },
        userInfoRightUpper: {
            textAlign: "center",
            borderBottomColor: colors.lightBlack,
            borderBottomWidth: 2,
            paddingBottom: 18
        },
        descriptionCard:{
            alignItems: "center"
        },
        descTitle: {
            fontSize: 15,
            fontWeight: "bold"
        },
        text: {
            textAlign: "center",
        },
    })

export default CardItem