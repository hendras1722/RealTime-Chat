import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, FlatList } from 'react-native'
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db, time } from '../../Config/Config'

class Chat extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.getParam('name'),
            uid: props.navigation.getParam('uid'),
            photo: props.navigation.getParam('photo'),
            textMessage: '',
            messageList: '',
            title: ''
        }

        console.log(this.state.photo)
    }

    componentDidMount() {
        db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }


    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = (await db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`).push()).key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: time,
                from: auth.currentUser.uid
            }
            updates['messages/' + auth.currentUser.uid + '/' + this.state.uid + '/' + msgId] = message
            updates['messages/' + this.state.uid + '/' + auth.currentUser.uid + '/' + msgId] = message
            db.ref().update(updates);
            this.setState({ textMessage: '' })
            console.log(this.state.textMessage)
        }
    }


    handleChange = key => val => {
        this.setState({ [key]: val })
    }


    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + '' + d.getMonth() + '' + result;
        }
        return result
    }

    renderRow = ({ item }) => {
        console.disableYellowBox = true;
        // console.log(auth.currentUser.uid)
        const Chat = () => {
            if (item.from == auth.currentUser.uid) {
                return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}>
                        <View style={{ marginHorizontal: 5, marginVertical: 5, borderColor: '#FFF', borderWidth: 1, padding: 15, borderRadius: 10, backgroundColor: '#1bb2ef', flexDirection: 'row' }}>
                            <View style={{ flex: 5, paddingLeft: 20, paddingRight: 10 }}>
                                <Text>{item.message}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: `${this.state.photo}` }} vstyle={{ width: 65, height: 65, borderRadius: 50, position: 'relative', paddingBottom: 10 }} />
                                <Text style={{ top: 5 }}>{this.convertTime(item.time)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}>
                        <View style={{ marginHorizontal: 5, marginVertical: 5, borderColor: '#FFF', borderWidth: 1, padding: 15, borderRadius: 10, backgroundColor: '#9ab3bd', flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: `${this.state.photo}` }} style={{ width: 50, height: 50, borderRadius: 50, position: 'relative', borderColor: 'white', borderWidth: 3 }} onPress={() => this.props.navigation.navigate('Home')} />
                                <Text style={{ top: 5 }}>{this.convertTime(item.time)}
                                </Text>
                            </View>
                            <View style={{ flex: 5, paddingLeft: 20, paddingRight: 10 }}>
                                <Text>{item.message}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )
            }
        }
        return (
            <View>
                <Chat />
            </View>
        )

    }



    render() {
        // console.log(auth.currentUser.uid)
        // console.log(id)
        const { id } = this.state.uid
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />
                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                            <Icon name="arrow-left" style={{ fontSize: 25, color: 'white' }}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Detailscreen')} >
                            <Text style={{ color: 'white', fontSize: 15 }}>{this.state.name}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* hello */}
                {/* mapping disini */}
                <FlatList
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* mapping disini */}

                <Text style={{ padding: 10 }}></Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                </View>

                <View style={{ padding: 0, flexDirection: 'row', maxHeight: 42, backgroundColor: 'white' }}>
                    <View style={{ flex: 8, padding: 3 }}>
                        <TextInput style={{ backgroundColor: 'white', fontSize: 12, paddingLeft: 15, paddingRight: 15 }} placeholder='Message' onChangeText={this.handleChange('textMessage')}>
                        </TextInput>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        {/* <Text>hello</Text> */}
                        <TouchableOpacity onPress={this.sendMessage} >
                            <Icon name="send" style={{ fontSize: 25, color: '#0092CD' }}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Chat;