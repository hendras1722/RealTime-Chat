import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import User from '../../../User'

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this.checkAuth();
    }

    // Fetch the token from storage then navigate to our appropriate place
    async checkAuth() {
        await auth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}