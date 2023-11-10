import { StyleSheet, View, Text, TextInput, Dimensions, FlatList, ScrollView, SectionList, SafeAreaView, StatusBar, Button, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GoogleMapView from '../Home/GoogleMapView'
import Anuncio from '../Home/Anuncio'
import Mision from '../Components/Mision'
import MisionEspecial from '../Components/MisionEspecial'
import { DataContext } from '../Context/DataContext'
import { Block, Accordion } from 'galio-framework'
import { Card, Divider } from 'react-native-paper'
import MisionPersonalizada from '../Components/MisionPersonalizada'



export default function Explore() {

  const { data } = useContext(DataContext);
  const [showSecondPage, setShowSecongPage] = useState(false);

  if (showSecondPage) {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Anuncio />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#bfc3ca',
          marginHorizontal: 120,
          borderRadius: 15,
          justifyContent: 'space-around',
          height: 35
        }}>
          <Pressable title='Misiones' style={{

            borderRadius: 15,
            paddingHorizontal: 22,
            justifyContent: 'center'
          }} onPress={() => { setShowSecongPage(false) }}>
            <Text style={{ color: 'white', fontWeight: '400' }}>Misiones</Text>
          </Pressable>
          <Pressable title='Logros' style={{
            backgroundColor: '#787a7e',
            borderRadius: 15,
            paddingHorizontal: 22,
            justifyContent: 'center',
          }} onPress={() => { setShowSecongPage(true) }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Logros</Text>
          </Pressable>
        </View>

        <ScrollView>
        <GoogleMapView />
        <View>
          <TextInput placeholder=' Seleccionar Lugar ' style={styles.searchBar} />
        </View>
        {data !== undefined &&
          <Pressable>
            <View style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>



              <View>
                <Text>Mision 01.- Prueba el pan de muerto</Text>
                <Text style={{ fontSize: 10 }}>Pulsa para ver opciones</Text>
              </View>


              <Image source={require('../../assets/pan-de-los-muertos.png')} style={{ width: 40, height: 40 }} />

            </View>
          </Pressable>
        }
        <Divider />
        {data && data.map((location, index ) => (
          <Card style={{margin:20}} key={location.id                                                                                                                                                                                                                                                                                                                                                 }>
              <Card.Cover
              
                source={{uri: location.uri}}
              />
              <Text style={{marginHorizontal:10, fontWeight:'bold'}}>{location.nombre}</Text>
              <Text style={{margin:10}}>{location.descripcion}</Text>
           
          </Card>
        ))}
        </ScrollView>

      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Anuncio />


        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#bfc3ca',
          marginHorizontal: 120,
          borderRadius: 15,
          justifyContent: 'space-around',
          height: 35
        }}>
          <Pressable title='Misiones' style={{
            backgroundColor: '#787a7e',
            borderRadius: 15,
            paddingHorizontal: 22,
            justifyContent: 'center'
          }} onPress={() => { setShowSecongPage(false) }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Misiones</Text>
          </Pressable>
          <Pressable title='Logros' style={{
            borderRadius: 15,
            paddingHorizontal: 22,
            justifyContent: 'center',
          }} onPress={() => { setShowSecongPage(true) }}>
            <Text style={{ color: 'white', fontWeight: '400', textAlign: 'center' }}>Logros</Text>
          </Pressable>
        </View>
        <ScrollView>
          <GoogleMapView />
          <View>
            <TextInput placeholder=' Seleccionar Lugar ' style={styles.searchBar} />
          </View>
          
          {data === undefined && <Mision />}
          <MisionEspecial />
          <MisionPersonalizada />
        </ScrollView>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 20,
    marginTop: 10
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})