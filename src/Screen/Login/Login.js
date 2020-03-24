import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, Alert, AsyncStorage, ImageBackground } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'native-base';
// import Ava from './img/matthew.png'
import { auth } from "../../Config/Config"
import User from '../../../User'
import hello from '../../../img/hello.png'

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
        console.disableYellowBox = true
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />

                {/* sction chat */}

                <View style={{ flex: 1, backgroundColor: '#047cad' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white', top: 30 }}>Selamat Datang Di HandsApp</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Button style={{ width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'none', borderWidth: 3, borderColor: '#0092CD' }} onPress={() => this.props.navigation.navigate('Logup')}><Text style={{ color: 'white' }} >Sign Up</Text></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Button style={{ width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#0092CD' }}><Text style={{ color: 'white' }} onPress={() => this.props.navigation.navigate('Loginscreen')}>Sign In</Text></Button>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground source={hello} style={{ width: 300, height: 300 }}></ImageBackground>
                    </View>
                </View>
            </View >
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