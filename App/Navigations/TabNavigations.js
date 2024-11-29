import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home';
import { Ionicons } from '@expo/vector-icons';
import Explore from '../Screens/Explore';
import Profile from '../Screens/Profile';
import Ranking from '../Screens/Ranking';
import Carrito from '../Components/Carrito';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DM1 from '../Historias/DiaDeMuertos/DM1';
import { DataContext, DataProvider } from '../Context/DataContext';
import Usuarios from '../Components/Usuarios';
import { UserContext2 } from '../Context/UserContext2';


export default function TabNavigations({ route, navigation }) {

  const [datosFlatList, setDatosFlatList] = useState([]);

  const { user } = React.useContext(UserContext2)

  useEffect(() => {
    if (route.params?.datosAAgregar) {
      const nuevosDatos = route.params.datosAAgregar;
      //console.log(nuevosDatos);
      //COMPONENT RN
      setDatosFlatList([...datosFlatList, ...nuevosDatos]);

    }
  }, [route.params])

  const Tab = createBottomTabNavigator();
  return (

    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),

        }} />


      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }} />

      <Tab.Screen name="Carrito" component={Carrito}
        options={{
          tabBarLabel: 'Carrito',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }} />

      {
        user.user.role == "admin" &&
        <Tab.Screen name="Usuarios" component={Usuarios}
          options={{
            tabBarLabel: 'Usuarios',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
          }} />
      }

    </Tab.Navigator>
  )
}