import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase, { db } from '../config/firebaseConfig';

const ad = (props) => {

  const id = props.navigation.getParam("id");
  const courseID = props.navigation.getParam("data").courseID;
  const courseName = props.navigation.getParam("data").courseName;
  const sec = props.navigation.getParam("data").sec;

  return(<View style={styles.container}>
    <Text style={styles.row}>{id}</Text>
  <Text style={styles.row}>courseID{courseID}name{courseName}sec{sec}</Text>
  </View>);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  row: {
    padding: 4,
    borderBottomColor: "red",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default ad;

