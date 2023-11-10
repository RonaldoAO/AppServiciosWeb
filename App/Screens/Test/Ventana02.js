import React, { useContext, useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Context/DataContext';

const Ventana02 = ({ route, navigation }) => {
    const navigation2 = useNavigation();
  const [nuevosDatos, setNuevosDatos] = useState([]);

  const{setData} = useContext(DataContext);

  const nuevosDatosTemporales = ['Dato 1', 'Dato 2', 'Dato 3'];
  const handleAgregarDato = () => {
    const nuevosDatosTemporales = ['Dato 1', 'Dato 2', 'Dato 3']; // Puedes agregar aquí los datos que desees
    setNuevosDatos([...nuevosDatos, ...nuevosDatosTemporales]);
  };

  
  const handleConfirmarYRegresar = () => {
    onAgregarDatos(nuevosDatos); // Agregar los nuevos datos a la FlatList en Ventana01
    navigation.goBack(); // Regresar a la Ventana01
  };

  const handleAgregarDatoYRegresar = () => {
    // Agregar datos directamente a la FlatList en 
    setData(nuevosDatosTemporales)
    navigation2.navigate('Home');
  };

  return (
    <View>
      <Button title="Agregar Datos" onPress={handleAgregarDato} />
      <Button title="Confirmar y Regresar" onPress={handleAgregarDatoYRegresar} />
    </View>
  );
};

export default Ventana02;
