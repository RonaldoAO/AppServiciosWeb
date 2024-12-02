import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { Text, Pressable, View, StyleSheet, Image, ScrollView, Alert, Modal } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [pagado, setPagado] = useState(false);
    const [pagando, setPagando] = useState(false)

    const limpiar = async () => {

        Alert.alert('Espera...', 'Esta seguro de querer salir de la compra?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    clearCart()
                }
            },
        ]);
    }

    const pagar = async () => {
        setLoading(true)
        setPagando(true)
        if (cart.length == 0) {
            Alert.alert("Agrega productos antes de continuar...");
        } else {
            const productos = cart.map(({ _id, quantity }) => ({ productId: _id, quantity }))
            console.log("PRODUCTOS COMPRADOS", productos)
            try {
                console.log("PAGO CARRITO")
                const response = await axios.post("https://servdesarrollo-3.onrender.com/api/orders/", {
                    userId: user.user._id,
                    totalAmount: total,
                    productos,
                    status: 'Paid'
                })
                setPagando(false)
                setPagado(true)
                clearCart()
                //setModalVisible(false)

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            pagado ?
                                <View>
                                    <Text
                                        style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20 }}
                                    >PAGO EXITOSO</Text>
                                    <Text>Puedes ver tu orden de pago en tu perfil</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setPagado(false)
                                            setPagando(false)
                                            setModalVisible(false)

                                        }}
                                    >

                                        <Text style={styles.textStyle}>Hecho</Text>



                                    </Pressable>
                                </View>
                                :
                                <View>
                                    <Text
                                        style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20 }}
                                    >RESUMEN DE COMPRA</Text>
                                    {
                                        (cart.map((product) => (
                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={styles.modalText}>{product.nombre}</Text>
                                                <Text style={styles.modalPrice}>${product.precioUnitario}</Text>
                                            </View>
                                        )))
                                    }


                                    <Text
                                        style={{ fontWeight: 'bold', marginBottom: 10 }}
                                    >IVA ${total * .12}</Text>
                                    <Text
                                        style={{ fontWeight: 'bold', marginBottom: 10 }}
                                    >Total a pagar $ {total + (total * .12)}</Text>


                                    {!pagando ?
                                        <View>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => pagar()}
                                            >
                                                <Text style={styles.textStyle}>Pagar</Text>
                                            </Pressable>
                                            <Pressable
                                                style={[styles.button, styles.buttonCancel, { backgroundColor: 'white' }]}
                                                onPress={() => {
                                                    setModalVisible(false)
                                                }}
                                            >
                                                <Text style={[styles.textStyle, { color: 'black' }]}>Cancelar</Text>
                                            </Pressable>
                                        </View>
                                        :
                                        <ActivityIndicator animating={true} color='#d65c56' />
                                    }


                                </View>
                        }


                    </View>
                </View>
            </Modal>

            <View style={{ margin: 5, padding: 5 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Total: $ {total}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable style={[stylesE.buttonCarrito, { marginTop: 15 }]} onPress={() => limpiar()}>
                        <Text style={stylesE.buttonText}>Limpiar</Text>
                    </Pressable>
                    {
                        (!isLoading) ?
                            <Pressable style={[stylesE.buttonCarrito, { marginTop: 15 }]} onPress={() => {
                                if (cart.length == 0) {
                                    Alert.alert("Agrega productos antes de continuar...");
                                } else {
                                    setModalVisible(true)
                                }
                            }}>
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
            <ScrollView style={{height:600}}>
            <AnimatableTouchableOpacity useNativeDriver animation={animation}
                delay={250 + (1) * 200} style={[styles.mainView]}>
                
                    {
                        (cart.map((product) => (
                            <View key={product._id} style={[styles.mainvview, { marginTop: 10}]}>
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

                


            </AnimatableTouchableOpacity>
            </ScrollView>
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
        marginTop: 10
    },
    buttonCancel: {
        borderWidth: 2,
        borderColor: '#d65c56',
        marginTop: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 5,
        borderBottomWidth: .3,
        borderBottomColor: '#3f3f3f',
        paddingBottom: 5,
        width: 180
    },
    modalPrice: {
        marginBottom: 5,
        borderBottomWidth: .3,
        borderBottomColor: '#3f3f3f',
        paddingBottom: 5,
        textAlign: 'center',
        paddingLeft: 10

    },
});
export default Carrito;