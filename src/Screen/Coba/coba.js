import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, Alert, AsyncStorage } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'native-base';
// import Ava from './img/matthew.png'
import { auth } from "../../Config/Config"
import User from '../../../User'

class Login extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
        phone: '',
        name: ''
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    componentWillMount() {
        AsyncStorage.getItem('userPhone').then(val => {
            if (val) {
                this.setState({ phone: val })
            }
        })
    }

    onSubmitForm = async () => {
        if (this.state.phone.length < 10) {
            Alert.alert('error', 'wrong phone number')
        } else if (this.state.name.length < 3) {
            Alert.alert('error', 'wrong name')
        } else {
            await AsyncStorage.setItem('userPhone', this.state.phone)
            User.phone = this.state.phone;
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />
                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, flexDirection: 'row' }}>

                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Login</Text>
                    </View>
                </View>
                {/* sction chat */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>hello</Text>
                </View>
                <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <TextInput style={{ backgroundColor: 'white', width: 250, maxWidth: 250, borderRadius: 10 }} onChangeText={email => this.setState({ email })} placeholder="Phone Number" value={this.state.phone}
                            onChangeText={this.handleChange('phone')} keyboardType="number-pad">
                        </TextInput>
                    </View>
                    <View style={{ top: 15 }}>
                        <TextInput style={{ backgroundColor: 'white', width: 250, maxWidth: 250, borderRadius: 10 }} onChangeText={password => this.setState({ password })} placeholder="Name" value={this.state.name} value={this.state.name}
                            onChangeText={this.handleChange('name')}>
                        </TextInput>
                        <Text>Lupa Password</Text>
                    </View>
                    <View style={{ top: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Button style={{ width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 10 }} onPress={this.onSubmitForm}>
                                <Text>Masuk</Text>
                            </Button>
                        </View>
                        <View style={{ top: 10 }}>
                            <Text>Tidak memiliki Akun?</Text></View>
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

export default Login;