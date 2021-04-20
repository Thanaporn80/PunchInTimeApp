import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { styles, components } from '../style_constant/styles'
import Status from "../components/Status";
import firebase, { db } from '../config/firebaseConfig';
import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage, hideMessage } from "react-native-flash-message";
// import DatePicker from 'react-native-date-picker'

import { LinearGradient } from 'expo-linear-gradient';
// import { showMessage, hideMessage } from "react-native-flash-message";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Scan(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [date, setDate] = useState('09-10-2020');
  // param from home screen
  const id = props.navigation.getParam("id");
  const courseID = props.navigation.getParam("courseID");
  const courseName = props.navigation.getParam("courseName");
  const sec = props.navigation.getParam("sec");
  console.log("courseID", courseID);

 

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // add id to db
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data);
    // add
    const studentID = data;
    const studentOBJ = new Object();
    studentOBJ[studentID] = true;

    db
      .collection("course")
      .doc(id)
      .collection("attendance")
      .doc(date)
      .set({

        "student": studentOBJ
      }, { merge: true })
      ;

  };
  // async createCoruse() {
  //   const user = firebase.auth().currentUser.email;

  //   // if (this.state.courseID in check && this.state.sec in check) {
  //   const addAttendace = await db
  //     .collection("course")
  //     .add(courseOBJ).then(this.props.navigation.navigate('HomeScreen'));
  //     ;
  //   // }

  // };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LinearGradient
        colors={['#009698', ' #96ded1','white']}
        style={styles.container}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 1}}
      >

      <View style={{ flex: 0.6, flexDirection:'row', width: wp('100%'), alignItems: "center", justifyContent: 'center', }}>
        <Text style={{ fontSize: hp(6), color: "white", marginTop: wp(3), }}>{courseID} :</Text>
        <Text style={{ fontSize: hp(4), color: "white", marginTop: wp(4), marginLeft:20}}>{courseName} - Sec {sec}</Text>
      </View>
      {/* date picker */}
      
      <View style={styles.boxCam}>
      <DatePicker
        // style={styles.datePickerStyle}
        style={{backgroundColor:'white', marginTop:hp(4), width:wp('50%')}}
        date={date} // Initial date from state
        mode="date" // The enum of date, datetime and time
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-2020"
        maxDate="01-01-2025"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
        <View style={Camera.rectangleContainer}>
          <Text style={{ fontSize: hp('4%'), color: "#127885", marginBottom: 20 }}>=SCAN BARCODE=</Text>
          <View style={Camera.rectangle}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
          {scanned && (<View
          // onPress={() => {
          //   /* HERE WE GONE SHOW OUR FIRST MESSAGE */
          //   showMessage({
          //     message: "Simple message",
          //     type: "info",
          //   });
          // }}
          // title="Request Details"
          // color="#841584"
        />)}
        </View>
      </View>
      </LinearGradient>
  );
}
const Camera = StyleSheet.create({
  camera: {
    flex: 1,
  },
  rectangleContainer: {
    marginTop: hp(7),
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangle: {
    height: hp('15%'),
    width: wp('80%'),
    backgroundColor: "transparent",
  }
});
