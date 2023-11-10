import React, { memo } from 'react';
import { Text, Pressable, View, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card } from 'galio-framework';




const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(Pressable);

export default function PostList() {


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
    return (

        <AnimatableTouchableOpacity useNativeDriver animation={animation}
            delay={250 + (1) * 200} style={styles.mainView}>
            <View style={styles.mainvview}>
                <Card
                    flex
                    borderless
                    style={styles.card}
                    title="Carlos Alberto Sosa"
                    caption="Nombre de empresa"
                    location="Locacion"
                    avatar="https://github.com/RonaldoAO/Gamificacion/blob/main/assets/foto_perfil.jpg?raw=true"
                    imageStyle={styles.cardImageRadius}
                    imageBlockStyle={{ padding: 10 }}
                    image="https://github.com/RonaldoAO/Gamificacion/blob/main/assets/exp1.jpeg?raw=true"
                />
            </View>
            <View style={styles.mainvview}>
                <Card
                    flex
                    borderless
                    style={styles.card}
                    title="Carlos Alberto Sosa"
                    caption="Nombre de empresa"
                    location="Locacion"
                    avatar="https://github.com/RonaldoAO/Gamificacion/blob/main/assets/foto_perfil.jpg?raw=true"
                    imageStyle={styles.cardImageRadius}
                    imageBlockStyle={{ padding: 10 }}
                    image="https://github.com/RonaldoAO/Gamificacion/blob/main/assets/exp2.jpeg?raw=true"
                />
            </View>




        </AnimatableTouchableOpacity>

    );
}

const styles = StyleSheet.create({
    mainvview: {
        height:300,
        margin:10
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