import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase, { db } from '../config/firebaseConfig';

const ProfileScreen = (props) => {

  

  return(<View style={styles.container}>
    <Text style={styles.row}>Profile</Text>
  
  </View>);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
//   row: {
//     padding: 4,
//     borderBottomColor: "red",
//     borderBottomWidth: StyleSheet.hairlineWidth
//   }
});

export default ProfileScreen;

