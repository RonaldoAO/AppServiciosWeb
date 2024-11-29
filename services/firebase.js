import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAT4L44lBD0sThOni9zNYwyqCNWw10Fmo0",
    authDomain: "gamificacion-5bd2d.firebaseapp.com",
    projectId: "gamificacion-5bd2d",
    storageBucket: "gamificacion-5bd2d.appspot.com",
    messagingSenderId: "623659485107",
    appId: "1:623659485107:web:aad090b792775cd08b6dc6"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app; 
export const db = getFirestore(app)
