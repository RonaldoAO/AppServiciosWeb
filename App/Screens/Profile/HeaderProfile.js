import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

export default function HeaderProfile() {
  return (
    <View style={{alignItems:'center'}}>
      <Text style={{marginVertical:20,
      fontSize:10}}>Nacional: #15 Iternacional: #40</Text>
      <Image
      source={require('../../../assets/foto_perfil.jpg')}
      style={{height:85, width:85, borderRadius:200}}
      />
      <Text style={{
        marginVertical:20,
        fontWeight:500,
      }}>Carlos Alberto Sosa Perera</Text>
    </View>
  )
}
