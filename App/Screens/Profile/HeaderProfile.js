import { View, Text, Image, StyleSheet, Pressable, Modal, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import app from '../../../services/firebase'
import { getAuth } from 'firebase/auth'
import { UserContext } from '../../Context/UserContext';
import { UserContext2 } from '../../Context/UserContext2';
import { Ionicons } from '@expo/vector-icons';
import RNRestart from 'react-native-restart'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Divider } from 'react-native-paper';
import stylesE from '../../../stylesEspecified';
import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function HeaderProfile() {
  const auth = getAuth(app);
  const { usuario } = React.useContext(UserContext);
  const { user, setUser } = React.useContext(UserContext2)
  const [nombre, setNombre] = useState(user.user.name);
  const [correo, setCorreo] = useState(user.user.email);
  const [modalVisible, setModalVisible] = useState(false);
  const [screenConfiguration, setScreenConfiguration] = useState(1)
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  

  const handleLogout = async () => {
    
  }
  const handleUpdateAccount = async () => {
    console.log('Entro')
    const headers = {
      'auth-token': user.token
    }
    console.log('header')
    //Registrar
    try {
      setLoading(true)
      const response = await axios.patch(`https://servdesarrollo-3.onrender.com/api/users/${user.user._id}`, {
        "name": nombre,
        "email": correo,
      }, { headers })
      user.user = response.data.user

      setLoading(false)
      setModalVisible(false)
      setScreenConfiguration(1)
      
    } catch (error) {
      Alert.alert(error);
    }
  }
  return (

    <View style={{ alignItems: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {screenConfiguration == 1 &&
            <View style={styles.modalView}>

              <Pressable onPress={() => {
                setScreenConfiguration(2)
              }}>
                <Text style={styles.modalText}>Editar nombre/correo</Text>
              </Pressable>
              <Text style={styles.modalText}>Eliminar perfil</Text>
              <Pressable onPress={() => handleLogout()}>
              <Text style={styles.modalText}>Logout</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cerrar configuracion</Text>
              </Pressable>
            </View>
          }
          {screenConfiguration == 2 &&
            <View style={[styles.modalView]}>

              <TextInput placeholder='Nombre' placeholderTextColor="rgba(0,0,0,0.2)" style={[stylesE.textInput, { width: 300, marginHorizontal: 0 }]}
                onChangeText={e => setNombre(e)} value={nombre} />
              <TextInput placeholder='Email' placeholderTextColor="rgba(0,0,0,0.2)" style={[stylesE.textInput, { width: 300, marginHorizontal: 0 }]}
                value={correo} onChangeText={e => setCorreo(e)} />
              <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 30 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose, { marginHorizontal: 10 }]}
                  onPress={() => {
                    setScreenConfiguration(1)
                  }}>
                  <Text style={styles.textStyle}>Volver</Text>
                </Pressable>
                {loading ? (
                  <ActivityIndicator animating={true} color='#D65C56' />
                ) : (
                  <Pressable
                    style={[styles.button, styles.buttonClose, { marginHorizontal: 10 }]}
                    onPress={handleUpdateAccount}>
                    <Text style={styles.textStyle}>Guardar</Text>
                  </Pressable>
                )}

              </View>
            </View>
          }

        </View>
      </Modal>

      <Text style={{
        marginVertical: 20,
        fontSize: 10
      }}>{user.user.email}</Text>
      <Image
        source={require('../../../assets/foto_perfil.jpg')}
        style={{ height: 85, width: 85, borderRadius: 200 }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{
          marginVertical: 20,
          fontWeight: 500,
        }}>{user.user.name}

        </Text>
        <Pressable style={{ marginVertical: 'auto', marginLeft: 4 }} onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons name="options" color="black" size={15} />
        </Pressable>

      </View>



    </View>



  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#d65c56',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: .3,
    borderBottomColor: '#3f3f3f',
    paddingBottom: 14,
    width: 150
  },
});
