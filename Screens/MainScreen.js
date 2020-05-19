import React from 'react';
import {StyleSheet,Text,View,Dimensions, Platform}from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from '../Components/CardItem'
import colors from '../assets/colors'

const MainScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CardStack
        horizontalThreshold={Platform.OS == "android" ? 0 : Dimensions.get("window").width/2 }
        outputRotationRange={Platform.OS == "android" ? ['0deg', '0deg', '0deg'] : ['-15deg', '0deg', '15deg']}
        loop={true}
        style={styles.content}
        verticalSwipe={false}
        renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
        ref={swiper => {
          this.swiper = swiper
        }}
        onSwiped={() => console.log('onSwiped')}
        onSwipedLeft={() => console.log('onSwipedLeft')}
      >
        <Card style={styles.card}>
            <CardItem/>
            </Card>
      </CardStack>


    </View>
  );
};


const styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    elevation: 99
  },
  card:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height-70,
    backgroundColor: colors.lightBlue
  }
});

export default MainScreen