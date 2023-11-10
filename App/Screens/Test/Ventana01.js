import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import ComponenteEspecial from './ComponenteEspecial';

const Ventana01 = ({ route, navigation }) => {
  const [componenteVisible, setComponenteVisible] = useState(true);
  const [datosFlatList, setDatosFlatList] = useState([]);

  const agregarDatoAFlatList = (dato) => {
    setDatosFlatList([...datosFlatList, dato]);
    setComponenteVisible(false);
  };

  useEffect(() => {
    if (route.params?.datosAAgregar) {
      const nuevosDatos = route.params.datosAAgregar;
      setDatosFlatList([...datosFlatList, ...nuevosDatos]);
      setComponenteVisible(true);
    }
  }, [route.params]);

  return (
    <View>
      {componenteVisible && <ComponenteEspecial />}
      <FlatList
        data={datosFlatList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
      <Button title="Ir a Ventana 02" onPress={() => navigation.navigate('Ventana02', { onAgregarDatos: agregarDatoAFlatList })} />
      <Button title="Regresar" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Ventana01;
