import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, Alert, } from 'react-native';
// import styles from '../constants/styles';
import { auth, db } from '../../Config/Config';
import ImagePicker from 'react-native-image-picker';
import { Button, Item, Input } from 'native-base'
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import User from '../../../User'

export default class SettingsScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        imageSource: { uri: User.photo },
        upload: false,
        names: '',
        name: User.name,
        photo: User.photo
    };

    onLogout = async () => {
        const id = auth.currentUser.uid
        await db.ref('/user/' + id).child("status").set('offline')
        this.props.navigation.navigate('Login')
        auth.signOut().then(res => console.warn('oke'));
    };

    changeImage = () => {
        const options = {
            quality: 0.7,
            allowsEditing: true,
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
                waitUntilSaved: true,
                path: 'images',
                cameraRoll: true,
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.error) {
                console.log(error);
            } else if (!response.didCancel) {
                this.setState(
                    {
                        upload: true,
                        imageSource: { uri: response.uri },
                    },
                    this.uploadFile,
                );
            }
        });
    };

    onSubmit = async () => {
        const { name } = this.state;
        if (name.length < 1) {
            console.log('error')
        } else {
            User.name = name;
            await this.updateUser();
        }
    };


    updateUser = () => {
        db.ref('/user').child(auth.currentUser.uid).set(User);
        Alert.alert('Success', 'succesfull.');
    };

    updateUserImage = async (imageUrl) => {
        const id = auth.currentUser.uid
        auth.currentUser.photo = imageUrl
        await db.ref('/user/' + id).child('photo').set(imageUrl)
        Alert.alert('Succes', 'image changed successfull')
        this.setState({ upload: false, imageSource: { uri: imageUrl } })
    }

    uploadFile = async () => {
        const file = await this.uriToBlob(this.state.imageSource.uri);
        firebase
            .storage()
            .ref(`profile/${auth.currentUser.uid}.png`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => this.updateUserImage(url))
            .catch(error => {
                this.setState({
                    upload: false,
                    imageSource: require('../../../img/handsapp.png'),
                });
                Alert.alert('Error', 'Error on upload Image');
            });
    };

    uriToBlob = uri => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                reject(new Error('Error on upload image'));
            };

            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    };

    render() {
        const id = this.props
        console.log('wooweuow', id)
        return (
            <View>
                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                            <Icon name="arrow-left" style={{ fontSize: 25, color: 'white' }}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <TouchableOpacity >
                            <Text style={{ color: 'white', fontSize: 15 }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <TouchableOpacity onPress={this.changeImage}>
                        {this.state.upload ? (
                            <ActivityIndicator size="large" />
                        ) : (
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 100,
                                        resizeMode: 'cover'
                                    }}
                                    source={this.state.imageSource}
                                />
                            )}
                    </TouchableOpacity>
                </View>
                <View style={{ top: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Item style={{ width: 200 }}>
                        <Input value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
                    </Item>
                </View>
                <View style={{ marginVertical: 2.5, top: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                        <Button style={{ padding: 10, backgroundColor: '#0092CD', width: 70, justifyContent: 'center', alignItems: 'center' }} onPress={this.onSubmit}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ marginVertical: 2.5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                        <Button onPress={this.onLogout} style={{ padding: 10, backgroundColor: '#c41414', width: 70, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>Logout</Text>
                        </Button>
                    </View>
                </View>
            </View >
        );
    }
}