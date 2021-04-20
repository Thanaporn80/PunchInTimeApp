import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
// import Main from "../screens/main";
// import Course from "../screens/course";

import Addcourse from '../screens/AddNewCourse'
import ScanScreen from "../screens/Scan";
import HomeScreen from "../screens/HomeScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ProfileScreen from "../screens/Profile";

const MyNavigator = createStackNavigator(
    {

      Addcourse: { screen: Addcourse,navigationOptions: { title: "Add Course"}},
      HomeScreen: { screen: HomeScreen,navigationOptions: { title: "My course"}},
      AttendanceScreen: { screen: AttendanceScreen ,navigationOptions: { title: "Attendance"}},
      ScanScreen: { screen: ScanScreen,navigationOptions: { title: "Scan"}},
      ProfileScreen: { screen: ProfileScreen,navigationOptions: { title: ""}},
      
     

      
    },
    {
      initialRouteName: 'HomeScreen'
    }
  )
  export default createAppContainer(MyNavigator);