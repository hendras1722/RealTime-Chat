import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './src/Screen/Homescreen/Homescreen';
import Chat from './src/Screen/Chat/Chat'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen'
import login from './src/Screen/Login/Login'
import SettingsScreen from './src/Screen/Settings/SettingsScreen'
import homechat from './src/Screen/HomeChat/HomeChat'
import Loginscreen from './src/Screen/Login/LoginScreen'
import Logup from './src/Screen/Login/Logup'
import kontak from './src/Screen/kontak/kontak'
import Detailscreen from './src/Screen/Detail/Detailscreen';
import maps from './src/Screen/Maps/maps'
import foto from './src/Screen/Upload/Uploadfoto'

const AppStack = createStackNavigator({

  Apps: {
    screen: HomeScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4f4f4',
        elevation: 0,
        height: 35,
      },
    }
  }
});

const homeNavigator = createStackNavigator(

  {
    Home: {
      screen: HomeScreen,
    },
    Chat: {
      screen: Chat,
    },
    Login: {
      screen: login,
    },
    Settings: {
      screen: SettingsScreen,
    },
    Homechat: {
      screen: homechat
    },
    Loginscreen: {
      screen: Loginscreen
    },
    Logup: {
      screen: Logup
    },
    kontak: {
      screen: kontak
    },
    Detailscreen: {
      screen: Detailscreen
    },
    maps: {
      screen: maps
    },
    foto: {
      screen: foto
    }
  },
  {
    initialRouteName: 'Login',
  }
)

const AppContainer = createAppContainer(homeNavigator);


function App() {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <AppContainer />
  )
}

export default App;