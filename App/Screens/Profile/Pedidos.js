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

export default function Pedidos() {
  return (
    <View>
      <View style={{
        backgroundColor: '#D9D9D9',
        margin: 10,
        padding: 10,
      }}>
        <Text style={{fontWeight:'bold'}}>Pedido</Text>
        <Text>Estatus: 3/5 </Text>
        <Text>Fecha: 3/5 </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{  width: Dimensions.get('screen').width * 0.90,justifyContent: 'center', marginTop:20, marginBottom:10}}>
            <ProgressBar progress={1} color={MD3Colors.error50} />
          </View>
        </View>
        

      </View>
    </View>
  )
}