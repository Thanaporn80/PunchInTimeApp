import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
// import firebase from 'firebase/app';
// require('firebase/auth');
import firebase from "../config/firebaseConfig";
import { LinearGradient } from 'expo-linear-gradient';
class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("App");
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["purple", "white"]}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ActivityIndicator size="large" />
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoadingScreen;
