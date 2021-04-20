// import firebase from '../config/firebaseConfig'

import "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/database'
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAD8STFtzn3EVHipMbvHupcKZ0cKsYWpnk",
    authDomain: "punchintime-91daa.firebaseapp.com",
    databaseURL: "https://punchintime-91daa.firebaseio.com",
    projectId: "punchintime-91daa",
    storageBucket: "punchintime-91daa.appspot.com",
    messagingSenderId: "481145234598",
    appId: "1:481145234598:web:29bceb1c6bc314f8f40067",
    measurementId: "G-2S2CJLB7G4"
};

// initialize firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const db = firebase.firestore();
// firebase.database();

export default firebase;