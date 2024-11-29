/* 
Son misiones que crean las empresas dentro de su local 
*/
import { View, Text, StyleSheet, Image, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';


export default function MisionPersonalizada() {
    const navigation = useNavigation();
    return (
        <View style={styles3.tarjet}>
            <ImageBackground
                source={require('../../assets/villaMagica.jpeg')}
                style={styles3.imageBackground}>
                <View style={styles3.overlay}>
                    <View style={styles3.target_bottom}>
                        <Text style={styles3.title}>Expociencias Oaxaca 2023</Text>
                        <Button
                            title='Iniciar'
                            onPress = {() => navigation.navigate('test')}
                        />

                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

styles3 = StyleSheet.create({
    tarjet: {
        backgroundColor: '#534385',
        marginTop: 20,
        margin: 10,
        height:150,

    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    target_head: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white',
        fontWeight: '300',
        letterSpacing: 0.5,
        fontSize: 8,
        lineHeight: 20,
    },
    image: {
        height: 50,
        width: 50,
    },
    button: {
        margin: 10,
        borderRadius: 50,
    },
    target_bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 100,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    overlay:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo con opacidad
    flex: 1,
    justifyContent: 'center',
    padding: 5
    }
});