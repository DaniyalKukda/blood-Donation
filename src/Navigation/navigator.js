import React from "react";
import * as Screens from "../Screens/index";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MenuDrawer from "../Components/Menu";

const StackNavigatorAuthentication = createStackNavigator({
  Login: {
    screen: Screens.Login
  },
  Register: {
    screen: Screens.Register
  }
}

)
const StackNavigator = createStackNavigator({
  Home: {
    screen: Screens.Home,
    navigationOptions : {
      headerTitle:"Home"
    }
  },
  MyRequest: {
    screen: Screens.MyRequest,
    navigationOptions : {
      headerTitle:"My Request"
    }
  }
  ,
  PostRequirement: {
    screen: Screens.PostRequirement,
    navigationOptions : {
      headerTitle:"Post Requirement"
    }
  }
  ,
  Notifications : {
    screen: Screens.Notifications,
    navigationOptions : {
      headerTitle:"Notifications"
    }
  }
  ,
  Details : {
    screen: Screens.Details,
    navigationOptions : {
      headerTitle:"Post Details"
    }
  }
})
const Drawer = createDrawerNavigator({
  Home: StackNavigator,
  MyRequest: StackNavigator,
  PostRequirement: StackNavigator,
  Notifcation: StackNavigator,
  Settings: StackNavigator
}, {
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />
  }
})
const SwitchNavigator = createSwitchNavigator({
  Login: StackNavigatorAuthentication,
  Home: Drawer
})
const Navigator = createAppContainer(SwitchNavigator)

export default Navigator;