import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logros from './Profile/Logros';
import Misiones from './Profile/Misiones';
import Galeria from './Profile/Galeria';
import HeaderProfile from './Profile/HeaderProfile';

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = (componentName) => {
    switch (componentName) {
      case 'Logros':
        return <Logros/>;
      case 'Misiones':
        return <Misiones/>;
      case 'Galeria':
        return <Galeria/>;
      default:
        return <Logros/>;
    }
  };

  return (
    <View>
      <HeaderProfile/>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Pressable style={styles.button} onPress={() => setActiveComponent('Logros')}>
          <Text style={styles.text}>Logros</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setActiveComponent('Misiones')}>
          <Text style={styles.text}>Misiones</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setActiveComponent('Galeria')}>
          <Text style={styles.text}>Galeria</Text>
        </Pressable>
      </View>
      <View>
        {renderComponent(activeComponent)}
      </View>
    </View>

  )
}
styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'black',
  },
});