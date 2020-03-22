import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './src/Screen/Homescreen/Homescreen';
import Chat from './src/Screen/Chat/Chat'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen'

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
        }
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