import React, { Component } from 'react'
import {
    View, Text, Image, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, ToastAndroid
} from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, Item, Input, Button } from 'native-base';
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../Config/Config'

class Logup extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            name: '',
            email: '',
            password: '',
            uid: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            loading: false,
            updatesEnabled: false,
        }
        this.handleSignUp = this.handleSignUp.bind(this);
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

    handleSignUp = async () => {
        const { email, name, password } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
        } else if (email.length < 6) {
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
            await auth.createUserWithEmailAndPassword(email, password)
                .then(async userCredentials => {

                    db.ref('/user/' + userCredentials.user.uid)
                        .set({
                            name: this.state.name,
                            status: 'Online',
                            email: this.state.email,
                            photo: "http://photourl.com/photo"
                        })
                        .catch(error => console.log(error.message))

                    console.log(userCredentials);
                    ToastAndroid.show("Success", ToastAndroid.LONG)


                    if (userCredentials.user) {
                        userCredentials.user.updateProfile({
                            displayName: this.state.name,
                            photoURL: "http://linkphoto.com"
                        }).then((s) => {
                            this.props.navigation.navigate("Home")
                        })
                    }


                })
                .catch(error => {
                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                })

        }
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />

                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 5, justifyContent: 'center', padding: 5, marginHorizontal: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Daftar</Text>
                    </View>
                </View>

                {/* hello */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', top: 10 }}>
                        <Item style={{ width: 300 }}>
                            <Input placeholder="Nama" onChangeText={name => this.setState({ name })} value={this.state.name} />
                        </Item>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', top: 10 }}>
                        <Item style={{ width: 300 }} >
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
                            <Button onPress={this.handleSignUp} style={{ padding: 10, width: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: '#067bab' }}>
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

export default Logup;