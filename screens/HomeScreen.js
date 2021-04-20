import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles, components } from "../style_constant/styles";
// import firebase from 'firebase/app';
// require('firebase/auth');
import Status from "../components/Status";
import firebase, { db } from "../config/firebaseConfig";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/Ionicons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

class HomeScreen extends React.Component {
  state = { user: {}, data: [], selectedId: "", displayName:"" };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
      }
    });
    const { navigation } = this.props;

    this.getCourse();
    // this.willFocusSubscription = this.props.navigation.addListener(
    //   'willFocus',
    //   () => {
    //     this.getCourse();
    //   }

    // );
  }

  // componentWillUnmount() {
  //   this.willFocusSubscription.remove();
  // }
  // const showCourse = (doc) => {
  //   return ()
  // };
  // หนี้ที่เรา Note ไว้เอง
  getCourse = async () => {
    var temp = [];

    const user = firebase.auth().currentUser;
    const courseRef = db.collection("course");
    const teacherRef = db.collection("teacher");
    const snapshot = await courseRef.where("owner", "==", user.email).get();
    const snapshot2 = await teacherRef.where("email", "==", user.email).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      temp.push(doc);
      //  
      this.setState({ data: temp });
      // console.log("data will be", this.state.data[0], this.state.data[1])

      // showCourse(doc);
    });
    snapshot2.forEach((doc) => {
      console.log("snap2", doc.data().firstName);
      this.setState({displayName:doc.data().firstName})
    
    });

  
  };

  render() {
    // if it nothing in data
    <Status />;
    if (this.state.data.length == 0) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.box3}>
            <TouchableOpacity
              style={components.buttonPrimary}
              onPress={() => {
                this.props.navigation.navigate("Addcourse");
              }}
            >
              <Text style={components.buttonText}>Add course</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    // else already have data
    const renderItem = ({ item }) => {
      const backgroundColor =
        item.id === this.state.selectedId ? "#9cc5d7" : "white";
      const Item = ({ item, onPress, style }) => (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* <Status /> */}

          {/* Row Course */}
          <View style={{ width: wp("45%") }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AttendanceScreen", {
                  id: item.id,
                  data: item.data(),
                });
              }}
              style={[components.item, style]}
            >
              <Text style={components.title}>{item.data().courseID}</Text>
              <Text style={{ fontSize: hp(2) }}>{item.data().courseName}</Text>
              <Text style={{ fontSize: hp(2) }}>sec : {item.data().sec}</Text>
            </TouchableOpacity>
          </View>

          {/* Scan Button */}
          <View style={{ width: wp("30%") }}>
            {/* style={{backgroundColor:'pink', width:'30%'}} */}
            <TouchableOpacity
              style={components.item2}
              onPress={() => {
                this.props.navigation.navigate("ScanScreen", {
                  id: item.id,
                  courseID: item.data().courseID,
                  courseName: item.data().courseName,
                  sec: item.data().sec,
                });
              }}
            >
              <Text
                style={{
                  fontSize: hp(3),
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Scan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      return (
        <Item
          item={item}
          onPress={() => this.state.setState(item.id)}
          style={{ backgroundColor }}
        />
      );
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
        colors={['#009698', ' #96ded1','white']}
        style={styles.container}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 1}}
      >
        <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:wp('15%'), alignItems:'flex-end'}}>
            <Icon
								name="md-contact"
								size={70}
								style={{ marginTop: hp(1), marginBottom: hp(4) }}
                color="white"
                onPress={() => this.props.navigation.navigate("ProfileScreen")} />
              </View>
              <View style={{width:wp('70%'), marginLeft:wp(2)}}>
            <Text style={{fontSize:hp(2.5), color:"white", marginTop:hp(4)}}>HI, {this.state.displayName}</Text>
            </View>
          </View>
          {/* <View style={{flex: 0.6, backgroundColor:'blue', width: wp('100%')}}>
            <Text style={{ fontSize: 50, color: "white"}}>My Course</Text>
          </View> */}

          <FlatList
            style={{bottom:hp(7.5), marginTop:hp(3)}}
            data={this.state.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extradata={this.state.selectedId}
          ></FlatList>

          {/* <Button
          title="Scan"
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("scan");
          }}
            /> */}
          <View style={styles.boxButton}>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => {
                this.props.navigation.navigate("Addcourse");
              }}
            >
              <Text style={styles.fabIcon}>Add course</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = (navigationData) => {
  return {
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="logoff"
            iconName="ios-log-out"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};
export default HomeScreen;
