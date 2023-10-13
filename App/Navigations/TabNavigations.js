import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home';
import { Ionicons } from '@expo/vector-icons';
import Explore from '../Screens/Explore';
import Profile from '../Screens/Profile';
import Ranking from '../Screens/Ranking';

export default function TabNavigations() {
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
        <Tab.Screen name="Explora" component={Explore}
        options={{
            tabBarLabel:'Explora',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="compass-outline" color={color} size={size}/>
            ),
        }}/>
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