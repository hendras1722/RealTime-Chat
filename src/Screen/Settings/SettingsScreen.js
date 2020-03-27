import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, Alert, } from 'react-native';
// import styles from '../constants/styles';
import { auth, db } from '../../Config/Config';
import ImagePicker from 'react-native-image-picker';
import { Button, Item, Input } from 'native-base'
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SettingsScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        imageSource: require('../../../img/user.png'),
        upload: false,
        name: ''
    };
    // onLogout = async () => {
    //     const id = auth.currentUser.uid
    //     await db.ref('/user/' + id).child("status").set('offline')
    //     auth.signOut().then(res => console.warn('oke'));
    // };

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

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    EditUser = async () => {
        if (this.state.textMessage.length > 0) {
            let usrId = (await db.ref('/user/').child(`/${auth.currentUser.uid}/` + name).push()).key
            updates['user/' + auth.currentUser.uid]
            db.ref().update(updates);
            this.setState({ name: `${this.handleChange}` })
            console.log(this.state.name)
        }
    }

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
        return (
            <View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <TouchableOpacity onPress={this.changeImage}>
                        {this.state.upload ? (
                            <ActivityIndicator size="large" />
                        ) : (
                                <Image style={{ width: 100, height: 100, borderRadius: 100, resizeMode: 'cover' }} source={this.state.imageSource} />
                            )}
                    </TouchableOpacity>
                </View>
                <View style={{ top: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Item style={{ width: 200 }}>
                        <Input placeholder={auth.currentUser.displayName} onChangeText={this.EditUser} />
                    </Item>
                    <Button style={{ padding: 10, borderRadius: 5, backgroundColor: '#1bb2ef', top: 20 }} onPress={this.EditUser} >
                        <Text style={{ color: 'white' }}>Save</Text>
                    </Button>
                </View>
            </View >
        );
    }
}