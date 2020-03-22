import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'native-base';
// import Ava from './img/matthew.png'

class Login extends Component {
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
                <View style={{ backgroundColor: 'green', flex: 1 }}>
                    <Text>Hello</Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, borderBottomStartRadius: 40, borderBottomEndRadius: 40 }}>
                    <View>
                        <TextInput style={{ backgroundColor: 'white', width: 250, maxWidth: 250 }}></TextInput>
                    </View>
                    <View style={{ top: 10 }}>
                        <TextInput style={{ backgroundColor: 'white', width: 250, maxWidth: 250 }}></TextInput>
                        <Text>Lupa Password</Text>
                    </View>
                    <View style={{ top: 20 }}>
                        <Button style={{ width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 10 }}>
                            <Text>Masuk</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text>Tidak memiliki akun?</Text>
                    </View>
                    <View style={{ top: 5 }}>
                        <Button style={{ width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 10 }}>
                            <Text>Daftar</Text>
                        </Button>
                    </View>
                </View>


            </View>
        )
    }
}

export default Login;