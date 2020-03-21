import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './src/Screen/Homescreen/Homescreen';
import Chat from './src/Screen/Chat/Chat'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const homeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Chat: {
      screen: Chat,
    }
  }
)

const AppContainer = createAppContainer(homeNavigator);

function App() {
  return (
    <AppContainer />
  )
}

export default App;