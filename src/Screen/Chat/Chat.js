import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, FlatList } from 'react-native'
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db, time } from '../../Config/Config'
import moment from 'moment'
import User from '../../../User'

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
            status: props.navigation.getParam('status'),
            textMessage: '',
            messages: '',
            messageList: '',
            title: '',
            test: [],
            defaultPhoto: require('../../../img/user.png')
            // test: props.navigation.navigate
        }

        console.log(this.props.name)
    }

    async componentDidMount() {
        await this.getDataUser()
        // this.state.test.push(this.state.name)
        console.log("hello", this.props.name)
        db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }


    onDeleteUser = async () => {
        const id = auth.currentUser.uid
        await db.ref('/messages/' + id).remove();
        // await db.ref('/messages/' + id).remove();

    };


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
            // console.log(this.state.textMessage)
        }
    }


    // handleChange = key => val => {
    //     this.setState({ [key]: val })

    // }

    renderRow = ({ item }) => {
        console.disableYellowBox = true;
        console.log("ok", item)
        // console.log(auth.currentUser.uid)
        const Chat = () => {
            if (item.from == auth.currentUser.uid) {
                return (
                    <View style={{ flexDirection: 'row', marginVertical: 20, marginRight: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#1bb2ef', padding: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 5, borderBottomRightRadius: 1 }}>
                            <View style={{ maxWidth: 160, minWidth: 50 }}>
                                <Text>{item.message}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 5 }}>
                                    <Text style={{ top: 5, fontSize: 10 }}>
                                        {moment(item.time).format('LT')}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                            </View>
                        </View>
                        <View style={{ borderTopColor: "transparent", borderTopWidth: 20, borderRightColor: 'transparent', borderRightWidth: 20, borderLeftColor: '#1bb2ef', borderLeftWidth: 20, borderBottomColor: 'transparent', borderBottomWidth: 20 }}>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={{ uri: `${User.photo}` }} style={{ width: 40, height: 40, borderRadius: 50, position: 'relative', paddingBottom: 10 }} />
                        </View>
                    </View >
                )
            } else {
                return (
                    <TouchableOpacity >
                        <View style={{ flexDirection: 'row', marginVertical: 20, left: 10, alignItems: 'flex-end', justifyContent: 'flex-start' }} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detailscreen', { itemid: item.from })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={{ uri: `${this.state.photo}` }} style={{ width: 40, height: 40, borderRadius: 50, position: 'relative', paddingBottom: 10 }} />
                                </View>
                            </TouchableOpacity >
                            <View style={{ borderTopColor: "transparent", borderTopWidth: 20, borderLeftColor: 'transparent', borderLeftWidth: 20, borderRightColor: '#1bb2ef', borderRightWidth: 20, borderBottomColor: 'transparent', borderBottomWidth: 20 }}>
                            </View>
                            <View style={{ backgroundColor: '#1bb2ef', padding: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 1 }}>
                                <View style={{ maxWidth: 180, minWidth: 50 }}>
                                    <Text>{item.message}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ top: 5, fontSize: 10 }}>{moment(item.time).format('LT')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View >
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
        const { id } = this.state.uid
        // console.log(this.state.test)
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
                        <View>
                            <Text style={{ color: 'white', fontSize: 15 }} ellipsizeMode='tail' numberOfLines={1}>{this.state.name}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 10 }}>{this.state.status}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Biodata')}>
                            <Icon name="dots-vertical" style={{ fontSize: 30, alignItems: 'center', justifyContent: 'center', paddingRight: 15, color: 'white' }} />
                        </TouchableOpacity>
                    </View>

                </View>

                {/* hello */}
                {/* mapping disini */}
                <FlatList
                    ref={ref => (this.flatList = ref)}
                    onContentSizeChange={() =>
                        this.flatList.scrollToEnd({ animated: true })
                    }
                    onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => { item.uid }}
                />
                {/* mapping disini */}

                <Text style={{ padding: 10 }}></Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                </View>

                <View style={{ padding: 0, flexDirection: 'row', maxHeight: 42, backgroundColor: 'white' }}>
                    <View style={{ flex: 8, padding: 3 }} >
                        <TextInput style={{ backgroundColor: 'white', fontSize: 12, paddingLeft: 15, width: 300, maxWidth: 300, paddingRight: 15, minHeight: 50 }} placeholder='Message' onChangeText={(text) => this.setState({ textMessage: text })} value={this.state.textMessage} multiline={true} onSubmitEditing={this.sendMessage} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        {/* <Text>hello</Text> */}
                        <TouchableOpacity onPress={this.sendMessage}  >
                            <Icon name="send" style={{ fontSize: 25, color: '#0092CD' }}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Chat;