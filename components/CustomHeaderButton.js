import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";


const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={30}
      IconComponent={Ionicons}
      color={Platform.OS === "android" ? "white" : "#127885"}
    />
  );
};

export default CustomHeaderButton;
