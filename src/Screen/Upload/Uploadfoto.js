import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, FlatList } from 'react-native'
// import Ava from './img/matthew.png'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db, time, firebaseConfig } from '../../Config/Config'
import ImagePicker from 'react-native-image-picker'

class foto extends Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        photo: null,
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }

    render() {
        const { photo } = this.state
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <Button title="Choose Photo" onPress={this.handleChoosePhoto} style={{ backgroundColor: 'red' }} />
            </View>
        )
    }
}

export default foto;