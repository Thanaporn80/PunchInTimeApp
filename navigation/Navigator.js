import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
// import Main from "../screens/main";
// import Course from "../screens/course";
import Loading from "../screens/LoadingScreen";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LoginScreen";

// const MyNavigator = createStackNavigator(
//     {
//         signup : { screen: Signup, navigationOptions: { title: "" } },
//         login: { screen: Login, navigationOptions: { title: "Home" } },
//         // course: { screen: Course, navigationOptions: { title: "" } },
//         // registor: { screen: Registor, navigationOptions: { title: "Sign up" } },

//         // AddNew : { screen: AddNewCoursenup, navigationOptions: { title: "" } },
//         // scan : { screen: Scan, navigationOptions: { title: "SCAN" } },
//     },

//     {
//         // กำหนด defaultNavigationOptions (Slide 23-24)
//         defaultNavigationOptions: {
//             headerStyle: { backgroundColor: "#4a148c" },
//             headerTintColor: "white",
//         },
//     }
// );

// create our app's navigation stack
const MyNavigator = createStackNavigator(
  {
    Loading: { screen: Loading },
    SignUp: { screen: SignUp, navigationOptions: { title: "Signup" } },
    Login: {
      screen: Login,
      navigationOptions: { title: "Login", headerShown: false },
    },
  },
  {
    initialRouteName: "Loading",
  }
);
export default createAppContainer(MyNavigator);
