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
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
// import "firebase/firestore";
// import firebase from 'firebase/app';
// require('firebase/auth');
import firebase from '../config/firebaseConfig'
// style
import { styles, components } from '../style_constant/styles'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//background&button gradient
import { LinearGradient } from 'expo-linear-gradient';

class SignInScreen extends React.Component {
  state = { email: '', password: '', errorMessage: '', loading: false };
  onLoginSuccess() {
    this.props.navigation.navigate('App');
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }
  async signInWithEmail() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          this.onLoginFailure.bind(this)('Weak Password!');
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>

        <LinearGradient
        colors={['#009698', ' #96ded1','white']}
        style={styles.container}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 1}}
      >
            <View style={styles.box}>
              <Text style={{ fontSize: 50, color: "white"}}>PUNCH IN TIME</Text>
            </View>
            <View style={styles.box2}>
              <Text style={{ fontSize: 30, color: "#127885", marginTop:hp(5)}}>ลงชื่อเข้าใช้</Text>
              <TextInput
                style={components.input}
                placeholder="Email"
                placeholderTextColor="#9cc5d7"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}

              />
              <TextInput
                style={components.input}
                placeholder="Password"
                placeholderTextColor="#9cc5d7"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              
              />
              {this.renderLoading()}
              <Text
                style={{
                  fontSize: hp(2),
                  textAlign: "center",
                  color: "red",
                  width: "80%"
                }}
              >
                {this.state.error}
              </Text>
              <TouchableOpacity
                
                onPress={() => this.signInWithEmail()}
              >
                <LinearGradient
              start={{ x: 0, y: 0}}
              end={{x: 1, y: 1 }}
              style={components.buttonPrimary}
              colors={['#009698', '#96ded1']}
              ><Text style={components.buttonText}>LOGIN</Text></LinearGradient>
              </TouchableOpacity>
               {/* <GradientButton onPress={() => this.signInWithEmail()} text="LOGIN" width='90%' blueViolet impact /> */}
              <View style={{ height: hp('2%')}} />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("SignUp")
                }}
              ><Text style={{ color: 'black', fontWeight: 'bold', textDecorationLine: 'underline', fontSize:hp(2)}}>REGISTER</Text></TouchableOpacity>
            </View>
            <View style={{flex:0.5}}></View>
            </LinearGradient>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignInScreen;