import React, { Component } from 'react'
import { SafeAreaView, AsyncStorage, View, Text, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import { auth, db } from '../../Config/Config'

export default class Detailscreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        users: []
    }
    componentDidMount() {
        this.getDetails()
    }
    getDetails() {
        const id = this.props.navigation.state.params
        db.ref('/user/' + id).on('value', (snapshot) => {
            const user = snapshot.val()
            this.setState({
                users: user
            })
        }
        )
    }

    render() {
        const { photo } = this.props
        console.log(photo)
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
                        <Text style={{ color: 'white', fontSize: 15 }}>Nama</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <TouchableOpacity >
                        <Image style={{ width: 100, height: 100, borderRadius: 100, resizeMode: 'cover' }}
                            source={require('../../../img/user.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 10, paddingLeft: 20 }}>Nama</Text>
                    <Text style={{ fontSize: 15, paddingLeft: 20, paddingTop: 10 }}>nama</Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 10, paddingLeft: 20 }}>Status</Text>
                    <Text style={{ fontSize: 15, paddingLeft: 20, paddingTop: 10 }}>Status Orangnya</Text>
                </View>
            </View>
        )
    }
}