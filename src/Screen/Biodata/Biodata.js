import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
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
        photo: User.photo,
        latitude: User.latitude,
        longitude: User.longitude,
        newUser: require('../../../img/user.png')
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
            User.uid = auth.currentUser.uid
            User.latitude = this.state.latitude
            User.longitude = this.state.longitude
            await this.updateUser();
        }
    };


    updateUser = () => {
        db.ref('/user').child(auth.currentUser.uid).set(User);
        ToastAndroid.show("Success has been change", ToastAndroid.LONG)
    };

    updateUserImage = async (imageUrl) => {
        const id = auth.currentUser.uid
        auth.currentUser.photo = imageUrl
        await db.ref('/user/' + id).child('photo').set(imageUrl)

        ToastAndroid.show("Success", ToastAndroid.LONG)
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

                ToastAndroid.show("Failed upload photo, please try again", ToastAndroid.LONG)
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
        return (
            <View>
                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', User.photo)} >
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
                <Text style={{ marginHorizontal: 20 }}>Nama :</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="account-edit" style={{ fontSize: 30 }} />
                    </View>
                    <View style={{ flex: 5 }}>
                        <Item style={{ width: 250 }}>
                            <Input value={this.state.name} onChangeText={(text) => this.setState({ name: text })} multiline={false} onSubmitEditing={this.onSubmit} />
                        </Item>
                    </View>
                </View>
                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    <Text style={{ textAlign: 'justify' }}>Setelah memasukkan nama, tekan enter untuk menyimpan. Tampilan ini untuk menampilkan nama asli.</Text>
                </View>
                <Text style={{ marginHorizontal: 20 }}>Info :</Text>
                <View style={{ top: 5, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="information-outline" style={{ fontSize: 30 }} />
                    </View>
                    <View style={{ flex: 5 }}>
                        <Item style={{ width: 250 }}>
                            <Button value={this.state.name} onChangeText={(text) => this.setState({ name: text })} multiline={false} onSubmitEditing={this.onSubmit} />
                            <Text>Coming Soon</Text>
                        </Item>
                    </View>
                </View>
                <View style={{ marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={this.handleLogin} style={{ padding: 10, width: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b71020' }} onPress={this.onLogout}>
                        <Text style={{ color: 'white' }}>Keluar</Text>
                    </Button>
                </View>
            </View >
        );
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