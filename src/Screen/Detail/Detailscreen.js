import React, { Component } from 'react'
import { SafeAreaView, AsyncStorage, View, Text, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import { auth, db } from '../../Config/Config'
import User from '../../../User'
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location'


export default class Detailscreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            // name: props.user,
            // uid: props.navigation.getParam('uid'),
            // photo: props.navigation.getParam('photo'),
            textMessage: '',
            messageList: '',
            title: '',
            user: [],
            users: []
        }

        console.log("ijo", this.props.navigation.getParam(`itemid`))
    }

    getLocation() {
        db.ref('/user').on('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            this.setState({
                users: user
            })
        })

    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('itemid')
        await this.getDataUser(id)
        await this.getLocation()
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                // console.log(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    getDataUser(id) {
        db.ref('/user/' + id).once('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            // console.log("user", this.state.user)
            // const result = user.filter(user => user.uid !== current_user);
            // console.log(result)
            this.setState({
                user: user
            })
            // console.log(user)
        })
    }
    render() {
        const { photo } = this.props

        console.log("hello", this.state.user)
        const marker = this.state.user.map((item) => <MapView.Marker
            coordinate={{
                latitude: this.state.user[1],
                longitude: this.state.user[2],
            }}
            title={item.name}
            description="Hello" />
        )
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />
                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                            <Icon name="arrow-left" style={{ fontSize: 25, color: 'white' }}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Profile</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <TouchableOpacity >
                        <Image style={{ width: 100, height: 100, borderRadius: 100, resizeMode: 'cover' }}
                            source={{ uri: `${this.state.user[4]}` }}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 10, paddingLeft: 20 }}>Nama</Text>
                    <Text style={{ fontSize: 15, paddingLeft: 20, paddingTop: 10 }}>{this.state.user[3]}</Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 10, paddingLeft: 20 }}>Status</Text>
                    <Text style={{ fontSize: 15, paddingLeft: 20, paddingTop: 10 }}>{this.state.user[5]}</Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                    <View>
                        <Text style={{ fontSize: 10, paddingLeft: 20 }}>place</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <MapView
                            style={{ width: 270, height: 150 }} //window pake Dimensions
                            region={{
                                latitude: this.state.user[1],
                                longitude: this.state.user[2],
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }} >
                            {marker}
                        </MapView>

                    </View>
                </View>

            </View>
        )
    }
}