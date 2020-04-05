import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tab1 from '../HomeChat/HomeChat';
import Tab2 from '../kontak/kontak';
import Tab3 from '../Maps/maps';
import GetLocation from 'react-native-get-location'
import { auth, db } from '../../Config/Config'
import User from '../../../User'

class Homescreen extends Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            user: [],
            uid: null,
            dbRef: db.ref('user'),
            latitude: '',
            longitude: ''
        }
    }

    async componentDidMount() {
        await this.getLocation()
        console.log(User.photo)
        await this.state.dbRef.on('child_added', val => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === auth.currentUser.uid) {
                // User.uid = person.uid;
                User.name = person.name;
                User.email = person.email;
                User.status = person.status;
                User.photo = person.photo ? person.photo : null;
                User.latitude = person.latitude;
                User.longitude = person.longitude;

            } else {
                this.setState(prevState => {
                    return {
                        user: [...prevState.user, person]
                    };
                });
            }
        });
        User.Teman = this.state.user
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.state.dbRef.off();
    }

    getLocation() {
        const id = auth.currentUser.uid

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        })
            .then(location => {
                db.ref('/user/' + id).child('status').set('Online');
                db.ref('/user/' + id).child("latitude").set(location.latitude)
                db.ref('/user/' + id).child("longitude").set(location.longitude)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        this._isMounted = true;
    }


    render() {
        // console.log(auth.currentUser.uid)
        console.disableYellowBox = true
        console.log(User.Teman)
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />

                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 5, justifyContent: 'center', padding: 5, marginHorizontal: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>HandsApp</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Biodata', User.photo)}>
                            <Icon name="dots-vertical" style={{ fontSize: 30, alignItems: 'center', justifyContent: 'center', paddingRight: 15, color: 'white' }} />

                        </TouchableOpacity>
                    </View>
                </View>
                <Tabs tabContainerStyle={{ elevation: 0 }} >
                    <Tab heading={<TabHeading style={{ backgroundColor: '#0092CD' }}><Text style={{ color: 'white', fontSize: 30 }}>Chat</Text></TabHeading>} >
                        <Tab1 />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#0092CD', color: 'white' }}><Text style={{ color: 'white', fontSize: 30 }}>Contact</Text></TabHeading>}>
                        <Tab2 />
                    </Tab>
                </Tabs>
                {/* hello */}
            </View>

        )
    }
}

export default Homescreen;