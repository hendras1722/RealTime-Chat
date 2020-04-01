import React, { Component } from 'react'
import {
    View, Text, Image, TouchableOpacity, TextInput, StatusBar, FlatList
} from 'react-native'
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import { auth, db } from '../../Config/Config'
import GetLocation from 'react-native-get-location'

class HomeChat extends Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        users: [],
        latitude: '',
        longtitude: '',
    }

    componentDidMount() {
        this.getDataUser()
        this.getLocation()
    }

    getLocation() {
        const id = auth.currentUser.uid
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                db.ref('/user/' + id).child("latitude").set(location.latitude)
                db.ref('/user/' + id).child("longitude").set(location.longitude)

            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })

        this._isMounted = true;

    }


    getDataUser() {
        db.ref('/user').once('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            const result = user.filter(user => user.uid !== current_user);
            // console.log(result)
            this.setState({
                users: result
            })
            // console.log(user)
        })
    }

    onLogout = async () => {
        auth.signOut()
            .then(res => console.warn("oke"))
    }

    renderRow = ({ item }) => {
        // console.log(item)
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={
                            item.photo ? { uri: item.photo } : require('../../../img/user.png')
                        }
                            style={{ width: 65, height: 65, borderRadius: 50, position: 'relative', paddingBottom: 10 }} />

                    </View>
                    <View style={{ flex: 2, borderColor: '#b3b6b9', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15 }}>{item.name}</Text>
                        <Text style={{ top: 10 }}>{item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    Homechat = (_id) => {
        this.props.navigation.navigate('Homechat');
    }
    render() {
        // console.log(this.state.users)
        console.disableYellowBox = true
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>

                {/* hello */}
                <View>
                    <FlatList
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => { item.uid }}
                    />
                </View>
            </View>

        )
    }
}

export default withNavigation(HomeChat);