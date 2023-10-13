import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import styles from './styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';


export default function App() {

  const[showHomePage, setShowHomePage] = useState(false);

  const { height, width } = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const inteporlation = interpolate(imagePosition.value, [0, 1], [-height / 1.5, 0])
    return {
      transform: [{ translateY: withTiming(inteporlation, { duration: 1000 }) }]
    }
  })

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const inteporlation = interpolate(imagePosition.value, [0, 1], [250, 0])
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{translateY: withTiming(inteporlation, {duration:1000})}]
    }
  })

  const closseButtomContainerStyle = useAnimatedStyle(() =>{
    const inteporlation  = interpolate(imagePosition.value, [0, 1], [180, 360])
    return{
      opacity: withTiming(imagePosition == 1 ? 0 :1, {duration: 1000}),
      transform: [{rotate: withTiming( inteporlation + "deg", {duration:1000})}]
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return{
      opacity: imagePosition.value === 0  
      ? withDelay(400, withTiming(1,{duration:800}))
      : withTiming(0, {duration:300})
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0
  }
  /**
   * INTRO
   */
  if(!showHomePage){
    return (
      <Animated.View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg height='108.5%' width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={'100%'} />
            </ClipPath>
            <Image
              href={require("./assets/dia_de_muertos.jpeg")}
              width={width}
              height='120%'
              preserveAspectRatio='xMidYMid slice'
              clipPath='url(#clipPathId)'
            />
          </Svg>
          <Animated.View style={[styles.closeButtomContainer, closseButtomContainerStyle]}>
            <Text onPress={() => imagePosition.value = 1}>X</Text>
          </Animated.View>
        </Animated.View>
        <View>
          <Animated.View style={[styles.form2, buttonsAnimatedStyle]}>
            <Pressable style={styles.button} onPress={loginHandler}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>
            <View style={styles.content}>
              <Text style={styles.contentText}>Aun no tienes una cuenta?</Text><Text style={styles.link}> Registrate</Text>
            </View>
          </Animated.View>
          
          <Animated.View style={[styles.form, formAnimatedStyle]}>
            <TextInput placeholder='Email' placeholderTextColor="rgba(0,0,0,0.2)" style={styles.textInput}/>
            <TextInput placeholder='FullName' placeholderTextColor="rgba(0,0,0,0.2)" style={styles.textInput}/>
            <TextInput placeholder='Password' placeholderTextColor="rgba(0,0,0,0.2)" style={styles.textInput}/> 
            <Pressable onPress={() =>{setShowHomePage(true)}}  style={styles.button}>
              <Text style={styles.contentText}>Entrar</Text>
            </Pressable>
          </Animated.View>
        </View>
  
      </Animated.View>
    );
  }
  
  return(
    <View style={styles.main_container}>
      <NavigationContainer>
        <TabNavigations/>
      </NavigationContainer>
    </View>
  );
  /**
   * END INTRO
   */
}

