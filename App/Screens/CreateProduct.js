import { View, Text, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import stylesE from "../../stylesEspecified";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CreateProduct = ({ route, usuario }) => {
    const { product } = (route) ? route.params : { product: null };
    const [inputHeight, setInputHeight] = useState(40);
    const refName = useRef(null);
    const refDescripcion = useRef(null);
    const refPrecio = useRef(null);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(false);
    const increaseHeight = (input) => {
        const lineBreaks = input.split("\n").length - 1;
        setInputHeight(40 + lineBreaks * 20);
    };
    const navigation = useNavigation();
    const putData = async () => {

        const newProduct = {
            nombre: (nombre != "") ? nombre : product.name,
            descripcion: (descripcion != "") ? descripcion : product.descripcion,
            precioUnitario: (precio != "") ? Number(precio) : product.precio,

        };
        try {
            setLoading(true)
            const response = await axios.put(`https://servdesarrollo-3.onrender.com/api/producto/${product._id}`, newProduct);
            navigation.navigate("Home")
        } catch (error) {
            console.error("Error al hacer la solicitud PUT:", error);
        }
        console.log(newProduct)
    }


    const postData = async () => {
        try {
            setLoading(true)
            const newProduct = {
                nombre: nombre, descripcion,
                precioUnitario: Number(precio),
                Imagen: "iamgenDeEjemplo",
                usuarioId: usuario.user._id
            };
            console.log(newProduct)
            const response = await axios.post("https://servdesarrollo-3.onrender.com/api/producto", newProduct).then(setLoading(false));
            refName.current.clear();
            refDescripcion.current.clear()
            refPrecio.current.clear()

        } catch (error) {
            console.error("Error al hacer la solicitud POST:", error);
        }
    };
    return (
        <View style={{ marginTop: 50 }}>


            <TextInput defaultValue={(product != null) && product.nombre} placeholder='Nombre' placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput}
                onChangeText={(e) => setNombre(e)} ref={refName} />
            <TextInput ref={refDescripcion} defaultValue={(product != null) && product.descripcion} placeholder='Descripcion' placeholderTextColor="rgba(0,0,0,0.2)" editable style={[stylesE.textInput, { height: inputHeight }]}
                onChangeText={(e) => {
                    setDescripcion(e)
                    increaseHeight
                }}
                multiline={true} // Permite múltiples líneas
                blurOnSubmit={false} />
            <TextInput ref={refPrecio} placeholder='Precio' placeholderTextColor="rgba(0,0,0,0.2)" style={stylesE.textInput}
                onChangeText={(e) => setPrecio(e)} defaultValue={(product != null) && String(product.precioUnitario)} />
            {loading ? (
                <ActivityIndicator animating={true} color='#D65C56' />
            ) : (
                (product != null) ?
                    <Pressable style={stylesE.button}>
                        <Text style={stylesE.contentText} onPress={putData}>Guardar cambios</Text>
                    </Pressable>
                    :
                    <Pressable style={stylesE.button}>
                        <Text style={stylesE.contentText} onPress={postData}>Guardar</Text>
                    </Pressable>
            )

            }

        </View>
    );
};

export default CreateProduct;
