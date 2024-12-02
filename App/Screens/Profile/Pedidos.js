import { View, Text, Dimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, List, MD3Colors, ProgressBar } from 'react-native-paper'
import Accordion from 'react-native-collapsible/Accordion'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
]

export default function Pedidos({ usuario }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://servdesarrollo-3.onrender.com/api/orders/${usuario.user._id}`);
      
      setData(response.data);
      //Borrar
    } catch (error) {
      console.error("Error al hacer la solicitud GET:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData(); // Cambia el estado para forzar la renderización
    }, [])
  );
  return (
    <ScrollView>
      {loading ?
        <ActivityIndicator animating={true} color='#D65C56' />
        :
        (data.map((orden) => (
          <View key={orden._id} style={{
            backgroundColor: '#D9D9D9',
            margin: 10,
            padding: 10,
          }}>
            <Text style={{ fontWeight: 'bold' }}>Pedido</Text>
            <Text>Estatus: {orden.status}</Text>
            <Text>Fecha: {orden.createdAt} </Text>
            <Text>Total: ${orden.totalAmount}  </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: Dimensions.get('screen').width * 0.90, justifyContent: 'center', marginTop: 20, marginBottom: 10 }}>
                <ProgressBar progress={1} color={MD3Colors.error50} />
              </View>
            </View>


          </View>
        )))
      }
      {
        data.length == 0 && !loading && 
        <View style={{margin:10}}>
          <Text>Aun no tienes pedidos registrados</Text>
        </View>
      }



    </ScrollView>
  )
}