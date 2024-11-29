import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import { fileToBlob } from "./helpers";
import { getAuth } from "firebase/auth";
import app from "../services/firebase";



export const uploadImage = async(image, path, name) =>{
    const result  = {statusReponse: false, error: null, url:null}
    const storage = getStorage();
    const storageRef = ref(storage, `${path}/${name}`);
    const blob = await fileToBlob(image);
    try {
        await uploadBytes(storageRef, blob);
        result.statusReponse = true;
        result.url = await getDownloadURL(storageRef);
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async(data) =>{
    const result = { statusResponse: true, error: null}
    
    try {
        const auth = getAuth(app);
        await auth.currentUser.updateProfile(data)
    } catch (error) {
        result.error = error;
        result.statusResponse = false;
    }
    try {
        await updateProfile
        console.log('Photo URL updated successfully');
      } catch (error) {
        console.error('Error updating photo URL:', error);
      }
    return result
}