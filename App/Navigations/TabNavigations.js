import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home';
import { Ionicons } from '@expo/vector-icons';
import Explore from '../Screens/Explore';
import Profile from '../Screens/Profile';
import Ranking from '../Screens/Ranking';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DM1 from '../Historias/DiaDeMuertos/DM1';
import { DataContext, DataProvider } from '../Context/DataContext';


export default function TabNavigations({route, navigation}) {
    
    const [datosFlatList, setDatosFlatList] = useState([]);
    

  useEffect(() =>{
    if(route.params?.datosAAgregar){
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
            tabBarLabel:'Inicio',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home-outline" color={color} size={size}/>
            ),
        }}/>
        <Tab.Screen name="Explore" component={Explore}
        options={{
            tabBarLabel:'Explora',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="compass-outline" color={color} size={size}/>
            ),
            headerShown: false
        }}
        data={datosFlatList}
        />
        <Tab.Screen name="Stats" component={Ranking}
        options={{
            tabBarLabel:'Ranking',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="podium-outline" color={color} size={size}/>
            ),
        }}/>
        <Tab.Screen name="Profile" component={Profile}
        options={{
            tabBarLabel:'Perfil',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person-outline" color={color} size={size}/>
            ),
        }}/>
    </Tab.Navigator>
  )
}