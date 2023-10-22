import {StyleSheet, View, Text, TextInput, Dimensions } from 'react-native'
import React from 'react'
import GoogleMapView from '../Home/GoogleMapView'
import Anuncio from '../Home/Anuncio'
import Mision from '../Components/Mision'

export default function Explore() {
  return (
    <View>
      <Anuncio/>
      <GoogleMapView/>
      <View>
        <TextInput placeholder=' Seleccionar Lugar ' style={styles.searchBar}/>
      </View>
      <Mision/>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar:{
    borderRadius:50,
    paddingHorizontal:10,
    backgroundColor:'#D9D9D9',
    marginHorizontal:20,
    marginTop:10
  }
})