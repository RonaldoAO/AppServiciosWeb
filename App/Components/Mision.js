import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import Button from './Button';


export default function Mision() {
    return (
        <View style={styles.tarjet}>
            <View style={styles.target_head}>
                <View>
                    <Text style={styles.title}>Misión Dia de Muertos</Text>
                    <Text style={styles.text}>Numero de logros: 7</Text>
                </View>
                <Image source={require('../../assets/medalla01.png')} style={styles.image}></Image>
            </View>
            <View style={styles.target_body}>
                <Text style={styles.text}>El dia de Muertos es una tradición mexicana celebrada
                    el mes Noviembre en la que se honra la memoria de los muertos</Text>
            </View>
            <View style={styles.target_bottom}>
                <Button                  
                    title='Iniciar'
                    
                />          
                <Button                  
                    title='Ver mas'
                />
                
            </View>
        </View>
    )
}

styles = StyleSheet.create({
    tarjet: {
        backgroundColor: '#534385',
        marginTop:20,
        margin: 10,
        paddingVertical:10, 
        paddingHorizontal: 20
    },
    title: {
        color:'white',
        fontWeight: 'bold',
    },
    target_head:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        color:'white',
        fontWeight: '300',
        letterSpacing: 0.5,
        fontSize:11,
        lineHeight:20,
    },
    image: {
        height: 50,
        width: 50,
    },
    button:{
        margin:10,
        borderRadius:50,
    },
    target_bottom:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})