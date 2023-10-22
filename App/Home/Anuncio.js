import { StyleSheet,View, Text, Image } from 'react-native'
import React from 'react'

export default function Anuncio() {
  return (
    <View style={styles.view}>
      <View>
      <Text style={styles.nombre}>Llegó la mision de Dia de Muertos</Text>
      <Text style={styles.texto}>Entra y no te pierdas los logros que tenemos para ti</Text>
      </View>
      <Image source={require('../../assets/logro01.png')} style={styles.image}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    view:{
        backgroundColor:'#403369',
        padding:4,
        margin:10,
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'space-around',
        
    },
    nombre:{
      fontSize:14,
      fontWeight:'600',
      color:'white'
    },
    texto:{
      fontSize:11,
      fontWeight:'300',
      color:'white',
      letterSpacing:0.9,
    },
    image:{
      height:50,
      width:50,
    }
})