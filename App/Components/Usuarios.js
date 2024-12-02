import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { Text, Pressable, View, StyleSheet, Image, ScrollView, Alert, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, Avatar, Button, Card as CardPaper, Checkbox, MD3Colors, Modal, ProgressBar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios, { Axios } from 'axios';
import { useCart } from '../Context/CartContext';
import { UserContext2 } from '../Context/UserContext2';

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(Pressable);

const Usuarios = ({ showButtons, name, descripcion, precio, usuario }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = React.useContext(UserContext2)
    const [modalVisible, setModalVisible] = useState(false);
    
    const { addToCart, cart } = useCart();
    const [checked, setChecked] = useState(false);
    const [idUser, setIdUser] = useState('');
    const getData = async () => {
        //Lista de Usuarios

        setLoading(true);

        try {

            const headers = {
                'auth-token': user.token
            }
            const response = await axios.get(`https://servdesarrollo-3.onrender.com/api/users`, { headers })
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
            setModalVisible(false)
            getData()
        } catch (error) {
            console.error("Error al hacer la solicitud DELETE:", error);
        }
    };

    const cambiarPermiso = async () => {
        console.log("USUARIO")
        console.log(idUser)
        console.log(checked)
        const headers = {
            'auth-token': user.token
        }
        setModalVisible(false)
        try {
            await axios.patch(`https://servdesarrollo-3.onrender.com/api/users/${idUser}`, {
                "role": (checked) ? 'admin' : 'user'
            }, { headers });
            console.log(`PATCH realizado en el post con ID ${idUser}`);
            
            getData()
        } catch (error) {
            console.error("Error al hacer la solicitud DELETE:", error);
        }
    }


    const LeftContent = props => <Ionicons name="cube" size={40} />
    return (
        <View style={{ alignItems: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                style={{ zIndex: 10 }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ height: 100 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text >
                                    Administrador
                                </Text>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    color='#d65c56'
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text >
                                    Usuario
                                </Text>
                                <Checkbox
                                    status={!checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    color='#d65c56'
                                />
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => cambiarPermiso()}>
                                <Text style={styles.textStyle}>Guardar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <AnimatableTouchableOpacity useNativeDriver animation={animation}
                delay={250 + (1) * 200} style={styles.mainView}>

                <ScrollView>
                    {loading ?
                        <ActivityIndicator animating={true} color='#D65C56' />
                        :

                        (data.map((us) => (
                            <View style={{
                                backgroundColor: '#D9D9D9',
                                margin: 10,
                                padding: 10,
                            }} key={us._id}>
                                <Text style={{ fontWeight: 'bold' }}>{us.name}</Text>
                                <Text>Correo: {us.email} </Text>
                                <Text>Role: {us.role} </Text>
                                <Text>Creado: {us.createdAt} </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: Dimensions.get('screen').width * 0.90, justifyContent: 'center', marginTop: 20, marginBottom: 10 }}>
                                        <ProgressBar progress={1} color={MD3Colors.error50} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button mode="contained-tonal" buttonColor='white'
                                        onPress={() => {
                                            if(us.role == 'admin'){
                                                setChecked(true)
                                            }else{
                                                setChecked(false)
                                            }
                                            setModalVisible(true)
                                            setIdUser(us._id)
                                        }}>Configurar Permisos</Button>
                                    <Button mode="contained-tonal" buttonColor='white'>Ver mas</Button>
                                </View>
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
        marginTop: 10,
        zIndex: -2
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
        width: 200,
        height: 200,
        zIndex: 10
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
        marginHorizontal: 10
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
export default Usuarios;