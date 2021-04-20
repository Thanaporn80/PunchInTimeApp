import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import firebase from 'firebase/app'
import { render } from 'react-dom';
import Status from "./components/Status";

import { SwitchNavigator } from 'react-navigation'


// import screens

import Navigator from './navigation/Navigator';
import Navigator2 from './navigation/Navigator2';
import HomeScreen from './screens/HomeScreen';

// var firebaseConfig = {
//   apiKey: "AIzaSyAD8STFtzn3EVHipMbvHupcKZ0cKsYWpnk",
//   authDomain: "punchintime-91daa.firebaseapp.com",
//   databaseURL: "https://punchintime-91daa.firebaseio.com",
//   projectId: "punchintime-91daa",
//   storageBucket: "punchintime-91daa.appspot.com",
//   messagingSenderId: "481145234598",
//   appId: "1:481145234598:web:29bceb1c6bc314f8f40067",
//   measurementId: "G-2S2CJLB7G4"
// };

// if (firebase.apps.length == 0)
//   firebase.initializeApp(firebaseConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: Navigator,
      App: Navigator2,
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
