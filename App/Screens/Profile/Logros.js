import { View, Text, FlatList } from 'react-native'
import React from 'react'
import LogroItem from './LogroItem'

export default function Logros() {
  const logros = [
    {
      Id:1,
      title: "Crea tu propio altar",
      icon: require('../../../assets/logro01.png')
    },
    {
      Id:2,
      title: "Pinta tu propipo alebrije",
      icon: require('../../../assets/logro01.png')
    },
    {
      Id:3,
      title: "Elabora y hornea pan dulce",
      icon: require('../../../assets/logro02.png')
    },
  ]
  return (
    <View style={{marginTop:30}}>
      <FlatList
      data = {logros}
      renderItem = {({item}) => (
        <LogroItem logro={item}/>
      )}
      />
    </View>
  )
}