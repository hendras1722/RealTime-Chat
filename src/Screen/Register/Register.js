import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'native-base';
// import Ava from './img/matthew.png'
import { auth } from "../../Config/Config"


class Register extends Component {
    static navigationOptions = {
        headerShown: false
    };



    render() {
        return (

            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#35B829" barStyle="light-content" />
                <View style={{ backgroundColor: 'blue' }}>
                    <Text style={{ padding: 10, marginVertical: 5, fontSize: 20, color: 'white' }}>Login</Text>
                </View>
                {/* sction chat */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>hello</Text>
                </View>
                <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <TextInput style={{ backgroundColor: 'white', width: 250, maxWidth: 250, borderRadius: 10 }} onChangeText={email => this.setState({ email })}>
                            <Text>Email</Text>
                        </TextInput>
                    </View>
                    <View style={{ top: 15 }}>
                        <TextInput style={{ backgroundColor: 'white', width: 250, maxWidth: 250, borderRadius: 10 }} onChangeText={password => this.setState({ password })}>
                            <Text>Password</Text>
                        </TextInput>
                    </View>
                    <View style={{ top: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Button style={{ width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 10 }} onPress={this.handleLogin}>
                                <Text>Register</Text>
                            </Button>
                        </View>
                    </View>
                </View>


            </View>
        )
    }
}

const Toast = props => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};

export default Register;