import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Asset } from 'expo-asset';
import stylesE from './stylesEspecified';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, runOnJS } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';
import { UserLocationContext } from './App/Context/UserLocationContext';
import * as Location from 'expo-location';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DM1 from './App/Historias/DiaDeMuertos/DM1';
import Ventana01 from './App/Screens/Test/Ventana01';
import Ventana02 from './App/Screens/Test/Ventana02';
import { DataProvider } from './App/Context/DataContext';
import ButtonGoogleLogin from './App/Components/ButtonGoogleLogin';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "./services/firebase"
const auth = getAuth(app);

export default function App() {
  const [location, setLocation] = useState(null);
  const [showHomePage, setShowHomePage] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, correo, password)
    .then((userCredential) =>{
      console.log('Cuenta creada')
      const user = userCredential.user;
      console.log(user);
      setShowHomePage(true)
    }).catch(error =>{
      console.log(error);
      Alert.alert(error.message)
    })
  }
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, correo, password)
    .then((userCredential) =>{
      console.log('Cuenta creada')
      const user = userCredential.user;
      console.log(user)
      setShowHomePage(true)
    }).catch(error =>{
      console.log(error);
    })
  }

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      //console.log(location);
    })();
  }, [showHomePage]);

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
      transform: [{ translateY: withTiming(inteporlation, { duration: 1000 }) }]
    }
  })

  const closseButtomContainerStyle = useAnimatedStyle(() => {
    const inteporlation = interpolate(imagePosition.value, [0, 1], [180, 360])
    return {
      opacity: withTiming(imagePosition == 1 ? 0 : 1, { duration: 1000 }),
      transform: [{ rotate: withTiming(inteporlation + "deg", { duration: 1000 }) }]
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0
        ? withDelay(400, withTiming(1, { duration: 800 }))
        : withTiming(0, { duration: 300 })
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) runOnJS(setIsRegistering)(false);
  }

  const registerHandler = () => {
    imagePosition.value = 0
    if (!isRegistering) runOnJS(setIsRegistering)(true);
  }
  /**
   * INTRO
   */
  if (!showHomePage) {
    return (
      <Animated.View style={stylesE.container}>
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
          <Animated.View style={[stylesE.closeButtomContainer, closseButtomContainerStyle]}>
            <Text onPress={() => imagePosition.value = 1}>X</Text>
          </Animated.View>
        </Animated.View>
        <View style={{ height:"20%"}}>
          <Animated.View style={[stylesE.form2, buttonsAnimatedStyle]}>
            <Pressable style={stylesE.button} onPress={loginHandler}>
              <Text style={stylesE.buttonText}>Entrar</Text>
            </Pressable>
            <View style={stylesE.content}>
              <Text style={stylesE.contentText}>Aun no tienes una cuenta?</Text><Pressable onPress={registerHandler}><Text style={stylesE.link}> Registrate</Text></Pressable>
            </View>
          </Animated.View>
          {/*Formulario Registro*/}
          {isRegistering && (
            <Animated.View style={[stylesE.form, formAnimatedStyle]}>

              <TextInput placeholder='Email' onChangeText={e => setCorreo(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
              <TextInput placeholder='Nombre de Usuario' placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
              <TextInput placeholder='Contraseña' onChangeText={(e) => setPassword(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
              <Pressable onPress={handleCreateAccount} style={stylesE.button}>
                <Text style={stylesE.contentText}>Registrar</Text>
              </Pressable>
              <Text style={{textAlign:'center',color:'rgba(0,0,0,0.2)'}}> ó </Text>
              <Pressable>
              <ButtonGoogleLogin icon={require("./assets/google.png")} name="Google"/>
              </Pressable>
              
            </Animated.View>
          )}
          {/*Formulario LogIn*/}
          {!isRegistering && (
            <Animated.View style={[stylesE.form, formAnimatedStyle]}>

              <TextInput placeholder='Correo/Usuario' onChangeText={e => setCorreo(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
              <TextInput placeholder='Password' onChangeText={(e) => setPassword(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
              <Pressable onPress={handleSignIn} style={stylesE.button}>
                <Text style={stylesE.contentText}>Entrar</Text>
              </Pressable>
              <Text style={{textAlign:'center',color:'rgba(0,0,0,0.2)'}}> ó </Text>
              <Pressable>
              <ButtonGoogleLogin icon={require("./assets/google.png")} name="Google"/>
              </Pressable>
            </Animated.View>
          )}

        </View>

      </Animated.View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={stylesE.main_container}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <DataProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={TabNavigations} options={{ headerShown: false }} />
              <Stack.Screen name="History1" component={DM1} options={{ headerShown: false }} />
              <Stack.Screen name="test" component={Ventana01} />
              <Stack.Screen name="Ventana02" component={Ventana02} />
            </Stack.Navigator>
          </NavigationContainer>
        </DataProvider>
      </UserLocationContext.Provider>
    </View>
  );
  /**
   * END INTRO
   */
}

