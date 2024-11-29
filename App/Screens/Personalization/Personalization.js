import { View, Text, Button, Pressable, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import stylesE from './../../../stylesEspecified';
import { Ionicons } from '@expo/vector-icons';
import { loadImageFromGallery } from '../../../utils/helpers';
import { uploadImage } from '../../../utils/actions';
import { getAuth, updateProfile } from 'firebase/auth';
import app from '../../../services/firebase';
import DatePicker from 'react-native-modern-datepicker'
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { getToda, getFormatedDate } from 'react-native-modern-datepicker';
import ButtonReactivo from '../../Components/ButtonReactivo';
const Personalization = ({ setShowHomePage }) => {

  const auth = getAuth(app);
  const [photoURL, setPhotoUrl] = useState(auth.currentUser.photoURL)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(null)
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
  const startDate2 = '1970/01/01';
  const [opcion01, setopcion01] = useState('a');
  const [opcion02, setopcion02] = useState('a');
  const [focos, setFocos] = useState(['#E1E2E6','#E1E2E6', '#E1E2E6']);
  const [focos2, setFocos2] = useState(['#E1E2E6','#E1E2E6', '#E1E2E6']);
  //const [focos3, setFocos3] = useSate();
  //const focos = ['#E1E2E6','#E1E2E6', '#E1E2E6']; 

  const handleUpdatePhotoURL = async () => {
    try {
      await updateProfile(auth.currentUser, { photoURL });
      console.log('Photo URL updated successfully');
    } catch (error) {
      console.error('Error updating photo URL:', error);
    }
  };

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1])
    console.log(result)
    if (!result.status) {
      return
    }
    console.log(auth.currentUser.uid)
    const resultUploadImage = await uploadImage(result.image, "avatars", auth.currentUser.uid);
    if (resultUploadImage.statusReponse) {
      setPhotoUrl(resultUploadImage.url)
    }
    try {
      handleUpdatePhotoURL
    } catch (error) {

    }
  }
  function handleOnPress() {

    setOpen(!open);
  };
  function handleChange(propdate) {

    console.log(propdate)
    setDate(propdate);
  }
  function handleButton(id){
    if(id==1 && focos[0] == '#E1E2E6')setFocos(['#D65C56','#E1E2E6', '#E1E2E6']);
    else if(id ==2 && focos[1] =='#E1E2E6') setFocos(['#E1E2E6','#D65C56', '#E1E2E6']);
    else if(id == 3 && focos[2] =='#E1E2E6') setFocos(['#E1E2E6','#E1E2E6', '#D65C56']);
    else{
      setFocos(['#E1E2E6','#E1E2E6', '#E1E2E6'])
    }
  }
  function handleButton2(id){
   if(id == 4 && focos2[0] == '#E1E2E6' ){
      setFocos2(['#D65C56','#E1E2E6', '#E1E2E6'])
    }else if(id == 5 && focos2[1] == '#E1E2E6' )setFocos2(['#E1E2E6','#D65C56', '#E1E2E6']);
    else if(id == 6 && focos2[2] == '#E1E2E6' )setFocos2(['#E1E2E6','#E1E2E6', '#D65C56']);
    else{
      setFocos2(['#E1E2E6','#E1E2E6', '#E1E2E6'])
    }
  }
  return (
    <View>
      <View style={{ position: "relative", top: 2, alignItems: "center", width: "100%" }}>
        <Text style={styles.text}>Comencemos a personalizar tu perfil</Text>
        <Text style={{ fontSize: 10 }}>Pulsa sobre el circulo para seleccionar tu foto de perfil</Text>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={changePhoto}>
          <Image source={{ uri: photoURL }} style={styles.avatar} />
          {(photoURL == null) &&
            <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
          }

        </TouchableOpacity>
      </View>




      <Pressable style={{
        backgroundColor: "#E1E2E6",
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        padding: 15,
        borderRadius: 20,
      }} onPress={handleOnPress}>
        <View>
          <Ionicons name="gift-outline" size={50} style={{}}></Ionicons>
        </View>
        <View style={{
          marginLeft: 15,
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500'
          }}>Fecha de Nacimiento</Text>
          <Text style={{ fontSize: 11 }}>{(date == null) ? 'Ingresa tu fecha de nacimiento' : date}</Text>
        </View>

      </Pressable>

      <View style={{ top: 2, alignItems: "center", width: "100%" }}>
        <Text style={styles.text}>Dejanos conocerte</Text>
        <Text style={{ fontSize: 10 }}>La siguiente información es importante para mejorar tu experiencia </Text>
        <Text style={{ fontSize: 10 }}>dentro de la aplicación</Text>
        
        <Modal
          animationType='slide'
          transparent={true}
          visible={open}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker mode='calendar'
                locale="es"

                minimumDate={startDate2}
                selected={date}
                onDateChange={handleChange} />
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>



      {/** 
       * FORMULARIO
      */}
      <View style={{ margin: 20}}>
        <View>
          <Text>¿Qué tipo de viajero te consideras?</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:10}}>
            <ButtonReactivo
              title='Aventurero'
              backgroundColor = {focos[0]}
              onPress={() => handleButton(1)}
            />
            <ButtonReactivo
            backgroundColor = {focos[1]}
              title='Tranquilo'
              onPress={() => handleButton(2)}
            />
            <ButtonReactivo
            backgroundColor = {focos[2]}
              title='Los dos'
              onPress={() => handleButton(3)}
            />
          </View>


        </View>
      </View>

      <View style={{ margin: 20}}>
        <View>
          <Text>¿Qué tipo de viaje prefieres?</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:10}}>
            <ButtonReactivo
              title='Cortos'
              backgroundColor = {focos2[0]}
              onPress={() => handleButton2(4)}
            />
            <ButtonReactivo
              title='Largos'
              backgroundColor = {focos2[1]}
              onPress={() => handleButton2(5)}
            />
            <ButtonReactivo
              title='Los dos'
              backgroundColor = {focos2[2]}
              onPress={() => handleButton2(6)}
            />
          </View>


        </View>
      </View>

      <View style={{ margin: 20}}>
        <View>
          <Text>¿Cuál es tu principal tema de interés?</Text>
          <Text style={{ fontSize: 10 }}>Puedes seleccionar varios</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:10}}>
            <ButtonReactivo
              title='Gastronomia'
            />
            <ButtonReactivo
              title='Arte'
            />
            <ButtonReactivo
              title='Historia'
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:10}}>
            <ButtonReactivo
              title='Música'
            />
            <ButtonReactivo
              title='Cine'
            />
            <ButtonReactivo
              title='Manualidades'
            />
          </View>

        </View>
      </View>
      <View>

        
        <View style={styles.container}>
          <Pressable style={[stylesE.button, styles.button]} onPress={() => setShowHomePage(3)}>
            <Text style={stylesE.buttonText}>Skip</Text>
          </Pressable>
          <Pressable style={[stylesE.button, styles.button]} onPress={() => setShowHomePage(3)}>
            <Text style={stylesE.buttonText}>Siguiente</Text>
          </Pressable>
        </View>
      </View>


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  button: {
    width: 120,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "400",
    textAlign: 'center',
    marginHorizontal: 30,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#E1E2E6",
    borderRadius: 100,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  avatar: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
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

})
export default Personalization