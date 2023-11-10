import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ButtonGoogleLogin({ icon, name }) {
    return (
        <View style={{
            backgroundColor: "#d9dadf", marginHorizontal: 40, marginVertical: 10,
            flexDirection: "row", alignItems: "center"
        }}>
            <View style={{ width: 50, height: 50, backgroundColor: "#9194a3", alignItems:"center"}}>
                <Image source={icon} style={{ width: 30, height: 30, marginTop:10}} />
            </View>
            <View style={{ backgroundColor: "#d9dadf", marginLeft:5 }}>
                <Text style={{ color: "white",fontSize:14,letterSpacing:0.7 }}>{name}</Text>
            </View>

        </View>
    )
}