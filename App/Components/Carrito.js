import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { Text, Pressable, View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, Avatar, Button, Card as CardPaper } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios, { Axios } from 'axios';
import { useCart } from '../Context/CartContext';
import stylesE from '../../stylesEspecified'
const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(Pressable);
import { UserContext2 } from '../Context/UserContext2';

const Carrito = ({ showButtons, name, descripcion, precio, usuario }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = React.useContext(UserContext2)
    const { addToCart, cart, total, clearCart, removeFromCart } = useCart();

    const pagar = async () => {
        setLoading(true)
        if (cart.length == 0) {
            Alert.alert("Agrega productos antes de continuar...");
        } else {
            const productos = cart.map(({ _id, quantity }) => ({ productId: _id, quantity }))
            try {

                const response = await axios.post("https://servdesarrollo-3.onrender.com/api/orders/", {
                    userId: user.user._id,
                    totalAmount: total,
                    productos,
                    status: 'Paid'
                })
                clearCart()
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

    }



    const [isLoading, setIsLoading] = useState(false);

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



    const LeftContent = props => <Ionicons name="cube" size={40} />
    return (
        <View>
            <View style={{ margin: 5, padding: 5 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Total: $ {total}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable style={[stylesE.buttonCarrito, { marginTop: 15 }]} onPress={() => clearCart()}>
                        <Text style={stylesE.buttonText}>Limpiar</Text>
                    </Pressable>
                    {
                        (!isLoading) ?
                            <Pressable style={[stylesE.buttonCarrito, { marginTop: 15 }]} onPress={() => pagar()}>
                                <Text style={stylesE.buttonText}>Pagar</Text>
                            </Pressable>
                            :
                            <View style={{ marginRight: 50, marginTop: -15 }}>
                                <ActivityIndicator animating={true} color='#D65C56' size="large" />
                                <Text style={{ fontSize: 10 }}>Generando orden</Text>
                            </View>
                    }


                </View>


            </View>
            <AnimatableTouchableOpacity useNativeDriver animation={animation}
                delay={250 + (1) * 200} style={styles.mainView}>
                <ScrollView>
                    {
                        (cart.map((product) => (
                            <View key={product._id} style={[styles.mainvview, { marginTop: 10 }]}>
                                <CardPaper>
                                    <CardPaper.Title title={product.nombre} subtitle={'$ ' + String(product.precioUnitario)} left={LeftContent} />
                                    <CardPaper.Content>
                                        <Text variant="bodyMedium">{product.descripcion}</Text>
                                    </CardPaper.Content>
                                    <CardPaper.Cover source={{
                                        uri: 'https://www.mexicodesconocido.com.mx/sites/default/files/nodes/3333/alebrijes-Oaxaca.jpg'
                                    }} style={{ height: 100, margin: 5 }} />
                                    {

                                        <CardPaper.Actions>
                                            <Button textColor='#D65C56' style={{
                                                borderBlockColor: "#D65C56", borderColor: "#D65C56"

                                            }} onPress={() => { removeFromCart(product._id, product.precioUnitario) }} >Quitar</Button>
                                        </CardPaper.Actions>
                                    }
                                </CardPaper>

                            </View>
                        )))
                    }

                </ScrollView>


            </AnimatableTouchableOpacity>
        </View>
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
export default Carrito;