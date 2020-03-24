import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading } from 'native-base';
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tab1 from '../HomeChat/HomeChat';
import Tab2 from '../Upload/Uploadfoto';
import Tab3 from '../Maps/maps';
import GetLocation from 'react-native-get-location'
import { auth, db } from '../../Config/Config'


class Homescreen extends Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
        users: [],
        latitude: '',
        longitude: ''
    }

    getLocation() {
        const id = auth.currentUser.uid
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        })
            .then(location => {
                db.ref('/user/' + id).child("latitude").set(location.latitude)
                // db.ref('/user/' + id).child("longitude").set(location.longitude)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        this._isMounted = true;
    }

    componentDidMount() {
        this.getLocation()
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />

                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 5, justifyContent: 'center', padding: 5, marginHorizontal: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>HandsApp</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                            <Icon name="dots-vertical" style={{ fontSize: 30, alignItems: 'center', justifyContent: 'center', paddingRight: 15, color: 'white' }} />

                        </TouchableOpacity>
                    </View>
                </View>
                <Tabs tabContainerStyle={{ elevation: 0 }}>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#0092CD' }}><Text style={{ color: 'white', fontSize: 30 }}>Chat</Text></TabHeading>} >
                        <Tab1 />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#0092CD', color: 'white' }}><Text style={{ color: 'white', fontSize: 30 }}>Kontak</Text></TabHeading>}>
                        <Tab2 />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#0092CD', color: 'white' }}><Text style={{ color: 'white', fontSize: 30 }}>Status</Text></TabHeading>}>
                        <Tab3 />
                    </Tab>
                </Tabs>
                {/* hello */}
            </View>

        )
    }
}

export default Homescreen;