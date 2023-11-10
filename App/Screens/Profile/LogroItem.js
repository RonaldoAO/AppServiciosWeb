import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

export default function LogroItem({ logro }) {
    return (
        <View style={{
            padding: 5, alignItems: 'center', margin: 10, justifyContent: 'space-between',
             flexDirection: 'row'
        }}>
            <View style={{
                backgroundColor:'#FFCF96',
                height:40,
                width:Dimensions.get('screen').width*0.85,
                marginLeft:-50,
                borderRadius:50,
                justifyContent:'center'
            }}>
                <Text style={{ marginLeft: 50, color: 'black', fontSize: 12, fontWeight: 'bold' }}>{logro.title}</Text>
            </View>
            <Image source={logro.icon} style={{ width: 50, height: 50 }} />

        </View>
    )
}