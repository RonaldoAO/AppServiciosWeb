import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function ButtonReactivo(props) {
  const { onPress, title = 'Save', backgroundColor ='#E1E2E6'} = props;
  return (
    <Pressable style={{
        backgroundColor:backgroundColor,
        width:100,
        height:25,
        borderRadius:16,
        alignItems:'center',
        justifyContent:'center'
    }} onPress={onPress}>
        <Text style={{
            color:(backgroundColor == '#E1E2E6')?'black':'white'
        }}>{title}</Text>
    </Pressable>
  )
}