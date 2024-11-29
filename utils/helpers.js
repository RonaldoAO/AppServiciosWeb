import * as Permissions from "expo-permissions"
import * as ImagePicker from 'expo-image-picker'
import {Alert} from 'react-native'

export const loadImageFromGallery = async(array) => {
    const response = {status: false, image : null}
    
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    })
    if(result.canceled) return response;
    response.status = true;
    response.image = result.assets[0].uri

    return response
};

export const fileToBlob = async(path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
};