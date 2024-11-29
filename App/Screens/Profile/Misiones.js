import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Button, List, MD3Colors, ProgressBar } from 'react-native-paper'
import Accordion from 'react-native-collapsible/Accordion'

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

export default function Misiones() {
  return (
    <View>
      <View style={{
        backgroundColor: '#D9D9D9',
        margin: 10,
        padding: 10,
      }}>
        <Text style={{fontWeight:'bold'}}>Actualiza tu perfil</Text>
        <Text>Completa tus datos: 3/5 </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:10}}>
          <View style={{ width: Dimensions.get('screen').width * 0.80, justifyContent: 'center' }}>
            <ProgressBar progress={0.5} color={MD3Colors.error50} />
          </View>
          <Text style={{ fontSize: 10 }}>50%</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Button  mode="contained-tonal" buttonColor='white'>Continuar</Button>
        <Button  mode="contained-tonal" buttonColor='white'>Eliminar</Button>
        </View>

      </View>
    </View>
  )
}