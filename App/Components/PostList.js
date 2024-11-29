import React, { memo, useCallback,  useEffect, useState } from 'react';
import { Text, Pressable, View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, Avatar, Button, Card as CardPaper } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios, { Axios } from 'axios';
import { useCart } from '../Context/CartContext';

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(Pressable);

const PostList = ({ showButtons, name, descripcion, precio, usuario }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { addToCart, cart } = useCart();

    const getData = async () => {
        setLoading(true);
        
        try {
            const response = (showButtons) ?    await axios.get(`https://servdesarrollo-3.onrender.com/api/producto/obtain/${usuario.user._id}`):
            await axios.get("https://servdesarrollo-3.onrender.com/api/producto");      
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
    const animation = {
        from: {
            opacity: 0,
            translateX: 60,
        },
        to: {
            opacity: 1,
            translateX: 0,
        },
    };
    
    const goToEditProduct = (product) => {
        navigation.navigate('Producto', { product });
    };
    const deleteData = async (id) => {
        try {
          await axios.delete(`https://servdesarrollo-3.onrender.com/api/producto/${id}`);
          console.log(`DELETE realizado en el post con ID ${id}`);
          getData()
        } catch (error) {
          console.error("Error al hacer la solicitud DELETE:", error);
        }
      };
    
    const LeftContent = props => <Ionicons name="cube" size={40} />
    return (
        <AnimatableTouchableOpacity useNativeDriver animation={animation}
            delay={250 + (1) * 200} style={styles.mainView}>
            <ScrollView>
                {loading ?
                    <ActivityIndicator animating={true} color='#D65C56' />
                    :
                    (data.map((product) => (
                        <View key={product._id} style={[styles.mainvview, { marginTop: 10 }]}>
                            <CardPaper>
                            <CardPaper.Title title={product.nombre} subtitle={'$ ' + String(product.precioUnitario)} left={LeftContent} />
                            <CardPaper.Content>
                                <Text variant="bodyMedium">{product.descripcion}</Text>
                            </CardPaper.Content>
                            <CardPaper.Cover source={{ 
                                uri: 'https://www.mexicodesconocido.com.mx/sites/default/files/nodes/3333/alebrijes-Oaxaca.jpg' }} style={{ height: 100, margin: 5 }} />
                            {
                                (showButtons)?
                                <CardPaper.Actions>
                                    <Button textColor='#D65C56' style={{
                                        borderBlockColor: "#D65C56", borderColor: "#D65C56"

                                    }} onPress={() => goToEditProduct(product)} >Editar</Button>
                                    <Button style={{ backgroundColor: "#D65C56" }} onPress={() => {deleteData(product._id)}}>Eliminar</Button>
                                </CardPaper.Actions>
                                :
                                <CardPaper.Actions>
                                    <Button textColor='#D65C56' style={{
                                        borderBlockColor: "#D65C56", borderColor: "#D65C56"

                                    }} onPress={() => goToEditProduct(product)} >Comprar</Button>
                                    <Button style={{ backgroundColor: "#D65C56" }} onPress={() => {
                                        addToCart(product)
                                        Alert.alert('Agregado correctamente');
                                    }}>Agregar al carrito</Button>
                                </CardPaper.Actions>
                            }
                            </CardPaper>
                        </View>
                    )))
                }

            </ScrollView>


        </AnimatableTouchableOpacity>

    );
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 10
    },
    mainvview: {
        marginHorizontal: 5
    },
    title: {
        fontSize: 12,
        width: '95%',
        fontWeight: '700',
        color: '#444',
    },
    username: {
        fontSize: 14,
        width: '95%',
        fontWeight: '700',
        color: '#444',
        marginTop: 10,
        marginLeft: 10
    },
    cat: {
        opacity: 0.5,
        fontSize: 12,
        width: '100%',
        marginBottom: 5,
        textTransform: 'capitalize',
    },
});
export default PostList;