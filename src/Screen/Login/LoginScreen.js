import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, StyleSheet } from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, Item, Input, Button } from 'native-base';
// import Ava from './img/matthew.png'
import { auth, db } from '../../Config/Config'

class Loginscreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            visible: false,
            Onprosess: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;

    };

    componentWillUnmount() {
        this._isMounted = false;

    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    handleLogin = () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            // Action
            auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    console.log(data)
                    this.props.navigation.navigate("Home")
                })
                .catch(error => console.log(error.message))
        }
    };

    render() {
        console.disableYellowBox = true
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />

                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 5, justifyContent: 'center', padding: 5, marginHorizontal: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}></Text>
                    </View>
                </View>

                {/* hello */}
                <View style={{ backgroundColor: '#0092CD', justifyContent: 'center', alignItems: 'center', height: 150 }}>
                    <Image source={require('../../../img/handsapp.png')} style={{ width: 80, height: 80, top: -30, borderRadius: 50 }} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', top: 10 }}>
                        <Item style={{ width: 300 }}>
                            <Input placeholder="Email" onChangeText={email => this.setState({ email })} value={this.state.email} />
                        </Item>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', top: 10 }}>
                        <Item style={{ width: 300 }}>
                            <Input placeholder="Password" onChangeText={password => this.setState({ password })} value={this.state.password} />
                        </Item>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', top: 30 }}>
                        <View>
                            <Button onPress={this.handleLogin} style={{ padding: 10, width: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: '#067bab' }}>
                                <Text style={{ color: 'white' }}>Masuk</Text>
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

const styles = StyleSheet.create({
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    }
});
export default Loginscreen;