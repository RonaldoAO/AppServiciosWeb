import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, Modal, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Asset } from 'expo-asset';
import stylesE from './stylesEspecified';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, runOnJS } from 'react-native-reanimated'
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';
import { UserLocationContext } from './App/Context/UserLocationContext';
import * as Location from 'expo-location';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DM1 from './App/Historias/DiaDeMuertos/DM1';
import Ventana01 from './App/Screens/Test/Ventana01';
import Ventana02 from './App/Screens/Test/Ventana02';
import { DataProvider } from './App/Context/DataContext';
import ButtonGoogleLogin from './App/Components/ButtonGoogleLogin';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { RecaptchaVerifier, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "./services/firebase"
import { UserContext2 } from './App/Context/UserContext2';
import { UserProvider } from './App/Context/UserContext';
import { ActivityIndicator, Button, Dialog, PaperProvider, Portal } from 'react-native-paper';
//import Personalization from './App/Screens/Personalization/Personalization';
import axios from 'axios';
import CreateProduct from './App/Screens/CreateProduct';
import { CartProvider } from './App/Context/CartContext';
import Carrito from './App/Components/Carrito';
const auth = getAuth(app);




export default function App({route}) {
  const [location, setLocation] = useState(null);
  const [showHomePage, setShowHomePage] = route ? useState(route.params.showHomePage) : useState(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('ERROR')
  

  useEffect(() =>  {
    console.log('Componente Recargado')
  },[])

  const handleCreateAccount = async () => {
    //Registrar
    try {
      setIsLoading(true)
      const response = await axios.post("https://servdesarrollo-3.onrender.com/api/users/register", {
        "name": nombre,
        "email": correo,
        password
      })
      setUser(response.data);
      setShowHomePage(3)
    } catch (error) {
      Alert.alert(error);
    }
  }

  const handleSignIn = async () => {
    //Logear
    try {
      setIsLoading(true)
      const response = await axios.post("https://servdesarrollo-3.onrender.com/api/users/login", {
        "email": correo,
        password
      })
      console.log("Usuario logeado",response.data)
      setUser(response.data);
      setShowHomePage(3)
    } catch (error) {

      setIsLoading(false)
      console.log(error)
      //Alert.alert(error);
      setError(error.message)
      showDialog()
    }
  }

  useEffect(() => {
    (async () => {
      console.log("RECARGO")
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

  

 
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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

  const handleLogout = () => {
    setUser(null); // Limpiar los datos del usuario 
    setShowHomePage(1);
  } // Volver a la página de login };
  /**
   * INTRO
   */

  

  if (showHomePage == 1) {
    return (
      <UserProvider>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <Animated.View style={stylesE.container}>
          <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
            <Svg height='108.5%' width="100%">
              <ClipPath id="clipPathId">
                <Ellipse cx={width / 2} rx={height} ry={'100%'} />
              </ClipPath>
              <Image
                href={require("./assets/abril.jpg")}
                width={width}
                height='120%'
                preserveAspectRatio='xMidYMid slice'
                clipPath='url(#clipPathId)'
              />

            </Svg>
            <Pressable onPressIn={() => imagePosition.value = 1} >
              <Animated.View style={[stylesE.closeButtomContainer, closseButtomContainerStyle]}>
                <Text>X</Text>
              </Animated.View>
            </Pressable>
          </Animated.View>



          <View style={{ height: "20%" }}>
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
              <Animated.View style={[stylesE.form, formAnimatedStyle,]}>

                <TextInput placeholder='Email' onChangeText={e => setCorreo(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
                <TextInput placeholder='Nombre de Usuario' onChangeText={(e) => setNombre(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
                <TextInput placeholder='Contraseña' onChangeText={(e) => setPassword(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput}
                  secureTextEntry={true} textContentType='password'
                />
                {!isLoading ? (
                  <Pressable onPress={handleCreateAccount} style={stylesE.button}>
                    <Text style={stylesE.contentText}>Registrar</Text>
                  </Pressable>
                ) : (
                  <ActivityIndicator animating={true} color='#D65C56' />
                )}




              </Animated.View>
            )}
            {/*Formulario LogIn*/}
            {!isRegistering && (
              <Animated.View style={[stylesE.form, formAnimatedStyle]}>

                <TextInput placeholder='Correo/Usuario' onChangeText={e => setCorreo(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput} />
                <TextInput placeholder='Password' onChangeText={(e) => setPassword(e)} placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput}
                  secureTextEntry={true} textContentType='password' />

                {
                  visible && <Text style={{ color: '#D65C56', marginHorizontal: 50, paddingLeft: 10, marginVertical: 10 }}>Correo o contraseña incorrectos</Text>
                }


                {!isLoading ? (
                  <Pressable onPress={handleSignIn} style={stylesE.button}>
                    <Text style={stylesE.contentText}>Entrar</Text>
                  </Pressable>
                ) : (
                  <ActivityIndicator animating={true} color='#D65C56' />
                )}


              </Animated.View>
            )}


          </View>

        </Animated.View>
      </UserProvider>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={stylesE.main_container}>
      <UserLocationContext.Provider value={{ location, setLocation }}>

        <UserContext2.Provider value={{ user, setUser }}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />

          <UserProvider>
            <DataProvider>
              <CartProvider>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen name="Home" component={TabNavigations} options={{ headerShown: false, header: null }} />
                    <Stack.Screen name="History1" component={DM1} options={{ headerShown: false, header: null, }} />
                    <Stack.Screen name="test" component={Ventana01} />
                    <Stack.Screen name="Producto" component={CreateProduct} />
                    <Stack.Screen name="Ventana02" component={Ventana02} />                
                  </Stack.Navigator>
                </NavigationContainer>
              </CartProvider>
            </DataProvider>
          </UserProvider>
        </UserContext2.Provider>
      </UserLocationContext.Provider>
    </View>
  );
  /**
   * END INTRO
   */
};
