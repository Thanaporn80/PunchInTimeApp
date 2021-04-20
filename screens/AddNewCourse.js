import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import { styles, components } from '../style_constant/styles'
import ReactDOM from "react-dom";
import firebase, { db } from '../config/firebaseConfig'
import Status from "../components/Status";
import { LinearGradient } from 'expo-linear-gradient';
class AddCourse extends React.Component {

  state = {
    courseID: "", courseName: "", sec: ""
  };
  async createCoruse() {
    const user = firebase.auth().currentUser.email;
    const courseOBJ = {
      courseID: this.state.courseID,
      courseName: this.state.courseName,
      sec: this.state.sec,
      owner: user,

    };

    // if (this.state.courseID in check && this.state.sec in check) {
    await db
      .collection("course")
      .add(courseOBJ).then(this.props.navigation.navigate('HomeScreen'))
      ;
    // }

  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      
        {/* <Status /> */}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <LinearGradient
        colors={['#009698', ' #96ded1','white']}
        style={styles.container}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 1}}
      >
          <View style={styles.container}>
            <View style={styles.box}>
              <Text style={{ fontSize: 50, color: "white" }}>Add New Course</Text>
            </View>
            <View style={styles.box2}>
              <TextInput
                style={components.input}
                placeholder="Course Id"
                autoCapitalize="none"
                placeholderTextColor="#9cc5d7"
                onChangeText={courseID => this.setState({ courseID })}
                value={this.state.courseID}
              //  ไม่แน่ใจตรงค่าvalue
              // onChangeText={val => this.onChangeText('CourseId', val)}
              />
              <TextInput
                style={components.input}
                placeholder="Course Name"
                autoCapitalize="none"
                placeholderTextColor="#9cc5d7"
                onChangeText={courseName => this.setState({ courseName })}
                value={this.state.courseName}
              // onChangeText={val => this.onChangeText('CourseName', val)}
              />
              <TextInput
                style={components.input}
                placeholder="Sec"
                autoCapitalize="none"
                placeholderTextColor="#9cc5d7"
                onChangeText={sec => this.setState({ sec })}
                value={this.state.sec}
              // onChangeText={val => this.onChangeText('CourseName', val)}
              />
              <LinearGradient
              start={{ x: 0, y: 0}}
              end={{x: 1, y: 1 }}
              style={components.buttonPrimary}
              colors={['#009698', '#96ded1']}
              >
              <TouchableOpacity
                onPress={() => {
                  this.createCoruse();
                }}
              ><Text style={components.buttonText}>Add course</Text>
              </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ flex: 0.8 }}>
            
            </View>
          </View>
          </LinearGradient>
        </TouchableWithoutFeedback >
        
      </SafeAreaView>

    )
  };
}
export default AddCourse;
