import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logros from './Profile/Logros';
import Misiones from './Profile/Misiones';
import Galeria from './Profile/Galeria';
import HeaderProfile from './Profile/HeaderProfile';
import CreateProduct from './CreateProduct';
import PostList from '../Components/PostList';
import { UserContext2 } from '../Context/UserContext2';
import Pedidos from './Profile/Pedidos';
import { Modal, Portal, Text as TextP, Button as ButtonP, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



export default function Profile() {
  const [activeComponent, setActiveComponent] = useState('Pedidos');
  const { user } = React.useContext(UserContext2)

  const renderComponent = (componentName) => {
    switch (componentName) {
      case 'Pedidos':
        return <Pedidos usuario={user}/>;
      case 'Galeria':
        return <PostList showButtons={true} usuario={user} />;
      case 'CreateProduct':
        return <CreateProduct usuario={user} />
      default:
        return <Pedidos />;
    }
  };
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <View>
      <HeaderProfile />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

        <Pressable style={[styles.button, { backgroundColor: `${activeComponent == 'Pedidos' ? '#727272' : '#d9d9d9'}` }]} onPress={() => setActiveComponent('Pedidos')}>
          <Text style={[styles.text, { color: `${activeComponent == 'Pedidos' ? 'white' : 'black'}` }]}>Pedidos</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: `${activeComponent == 'Galeria' ? '#727272' : '#d9d9d9'}` }]} onPress={() => setActiveComponent('Galeria')}>
          <Text style={[styles.text, { color: `${activeComponent == 'Galeria' ? 'white' : 'black'}` }]}>Mis productos</Text>
        </Pressable>
        <Pressable style={[styles.button, {
          backgroundColor: `${activeComponent == 'CreateProduct' ? '#727272' : '#d9d9d9'}`,
        }]} onPress={() => setActiveComponent('CreateProduct')}>
          <Text style={[styles.text, { color: `${activeComponent == 'CreateProduct' ? 'white' : 'black'}` }]}>Nuevo producto</Text>
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
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'black',
  },
});