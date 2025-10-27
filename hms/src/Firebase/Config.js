import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore/lite";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyA3t-3iuEsCAK3bQ5DJDOOoBr3ua_wECsw",
    authDomain: "olx-clone-eeb49.firebaseapp.com",
    projectId: "olx-clone-eeb49",
    storageBucket: "olx-clone-eeb49.appspot.com",
    messagingSenderId: "397009509350",
    appId: "1:397009509350:web:84550642198370943c1427",
    measurementId: "G-TGMFCDWE5B"
  };

const firebase = initializeApp(firebaseConfig);
export const db= getFirestore(firebase);
export const auth =getAuth(firebase);
export const storagePlace=getStorage(firebase);
export default firebase;
 