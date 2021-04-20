import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Picker,
  ScrollView,
} from "react-native";
import "firebase/firestore";
// import firebase from 'firebase';
// // import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/firestore'
import firebase, { db } from "../config/firebaseConfig";
import { styles, components } from "../style_constant/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

class SignUpScreen extends React.Component {
  state = {
    sid: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
    role: "",
    showTheThing: false,
  };

  onLoginSuccess() {
    this.props.navigation.navigate("App");
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }
  async signUpWithEmail() {
    const teacherOBJ = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    // const studentOBJ = {
    //     sid: this.state.sid,
    //     firstName: this.state.firstName,
    //     lastName: this.state.lastName,
    //     email: this.state.email,

    // };
    // add display name
    const displayName = this.state.firstName
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((createUser) => {
        firebase.firestore().collection("teacher").add(teacherOBJ);
      })

      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          this.onLoginFailure.bind(this)("Weak Password!");
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }

  // select role TO be Teacher or Student
  updateRole = (role) => {
    this.setState({
      role: role,
      showTheThing: role === "teacher" ? false : true,
    });
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <LinearGradient
            colors={["#009698", " #96ded1", "white"]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* <View style={styles.box}>
                        <Text style={{ fontSize: 50, color: 'white', marginBottom: 30, marginTop: 30 }}>ลงทะเบียน</Text>
                    </View> */}
            <ScrollView style={{ marginLeft: wp(1.5), marginTop: hp(3) }}>
              {/* <Picker selectedValue={this.state.role}
                            onValueChange={this.updateRole}
                            style={{
                                height: 50, width: "100%"
                                , marginBottom: 100
                            }}>
                            <Picker.Item label="Teacher" value="teacher" />
                            <Picker.Item label="Student" value="student" />

                        </Picker> */}
              {/* SID */}
              {/* {this.state.showTheThing &&
                            <TextInput
                                style={components.input}
                                placeholder="SID"
                                placeholderTextColor="#9cc5d7"
                                returnKeyType="next"
                                value={this.state.sid}
                                onChangeText={sid => this.setState({ sid })}
                            />
                        } */}
              {/* Fname */}
              <View
                style={{
                  height: hp("65%"),
                  width: wp("90%"),
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: hp(2),
                }}
              >
                <TextInput
                  style={components.input}
                  placeholder="Firstname"
                  placeholderTextColor="#9cc5d7"
                  returnKeyType="next"
                  textContentType="name"
                  value={this.state.firstName}
                  onChangeText={(firstName) => this.setState({ firstName })}
                />
                {/* Lname */}
                <TextInput
                  style={components.input}
                  placeholder="Lastname"
                  placeholderTextColor="#9cc5d7"
                  returnKeyType="next"
                  textContentType="name"
                  value={this.state.lastName}
                  onChangeText={(lastName) => this.setState({ lastName })}
                />
                {/* Email */}
                <TextInput
                  style={components.input}
                  autoCapitalize="none"
                  placeholder="Email"
                  placeholderTextColor="#9cc5d7"
                  returnKeyType="next"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                />
                {/* Password */}
                <TextInput
                  style={components.input}
                  placeholder="Password"
                  placeholderTextColor="#9cc5d7"
                  returnKeyType="done"
                  textContentType="newPassword"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                />
                {/* error */}
                {this.renderLoading()}
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: "red",
                    width: "80%",
                  }}
                >
                  {this.state.error}
                </Text>
                {/* Button */}
                <View
                  style={{
                    width: wp("100%"),
                    height: hp("80%"),
                    marginLeft: wp("50%"),
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={components.buttonPrimary}
                    colors={["#009698", "#96ded1"]}
                    onPress={() => this.signUpWithEmail()}
                  >
                    <Text style={components.buttonText}>SIGNUP</Text>
                  </LinearGradient>
                </View>
              </View>
            </ScrollView>
            <View style={{ flex: 0.2 }} />
          </LinearGradient>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignUpScreen;
