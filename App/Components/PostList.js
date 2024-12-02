import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, Pressable, View, StyleSheet, Image, ScrollView, Alert, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, Avatar, Button, Card as CardPaper } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios, { Axios } from 'axios';
import { useCart } from '../Context/CartContext';
import { UserContext2 } from '../Context/UserContext2';

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(Pressable);

const PostList = ({ showButtons, name, descripcion, precio, usuario }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productoC, setProductoC] = useState(null)
    const { addToCart, cart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = React.useContext(UserContext2)
    const [pagado, setPagado] = useState(false);
    const [pagando, setPagando] = useState(false);
    const getData = async () => {
        setLoading(true);

        try {
            const response = (showButtons) ? await axios.get(`https://servdesarrollo-3.onrender.com/api/producto/obtain/${usuario.user._id}`) :
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
    const pagar = async () => {
        setPagando(true)
        try {
            console.log("PAGO CARRITO")
            const response = await axios.post("https://servdesarrollo-3.onrender.com/api/orders/", {
                userId: user.user._id,
                totalAmount: productoC.precioUnitario,
                productos: [{
                    productId: productoC._id,
                    quantity: 1,
                }
                ],
                status: 'Paid'
            })
            setPagando(false)
            setPagado(true)
        } catch (error) {
            console.log(error)
        }


    }
    const LeftContent = props => <Ionicons name="cube" size={40} />
    return (

        <ScrollView>
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
                        {pagado ?
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
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={styles.modalText}>{productoC?.nombre}</Text>
                                    <Text style={styles.modalPrice}>${productoC?.precioUnitario}</Text>
                                </View>
                                <Text
                                    style={{ fontWeight: 'bold', marginBottom: 10 }}
                                >IVA ${productoC?.precioUnitario * .12}</Text>
                                <Text
                                    style={{ fontWeight: 'bold', marginBottom: 10 }}
                                >Total a pagar $ {productoC?.precioUnitario + (productoC?.precioUnitario * .12)}</Text>
                                <View style={{ flexDirection: 'row', width: 180, justifyContent: 'space-around' }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => pagar()}
                                    >
                                        {pagando ?
                                            <ActivityIndicator animating={true} color='white' />
                                            :
                                            <Text style={styles.textStyle}>Pagar</Text>
                                        }


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
                            </View>
                        }




                    </View>
                </View>
            </Modal>
            <AnimatableTouchableOpacity useNativeDriver animation={animation}
            delay={250 + (1) * 200} style={styles.mainView}>
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
                                uri: 'https://www.mexicodesconocido.com.mx/sites/default/files/nodes/3333/alebrijes-Oaxaca.jpg'
                            }} style={{ height: 100, margin: 5 }} />
                            {
                                (showButtons) ?
                                    <CardPaper.Actions>
                                        <Button textColor='#D65C56' style={{
                                            borderBlockColor: "#D65C56", borderColor: "#D65C56"

                                        }} onPress={() => goToEditProduct(product)} >Editar</Button>
                                        <Button style={{ backgroundColor: "#D65C56" }} onPress={() => { deleteData(product._id) }}>Eliminar</Button>
                                    </CardPaper.Actions>
                                    :
                                    <CardPaper.Actions>
                                        <Button textColor='#D65C56' style={{
                                            borderBlockColor: "#D65C56", borderColor: "#D65C56"

                                        }} onPress={() => {
                                            setProductoC(product)
                                            setModalVisible(true)
                                        }} >Comprar</Button>
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
            </AnimatableTouchableOpacity>
            

        </ScrollView>

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
        marginTop: 10,

    },
    buttonCancel: {
        borderWidth: 2,
        borderColor: '#d65c56',
        marginTop: 10,
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
export default PostList;