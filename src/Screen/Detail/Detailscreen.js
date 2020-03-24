import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

class Detailscreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.param('name'),
            uid: props.navigation.getParam('uid'),
            textMessage: '',
            messageList: '',
        }
        console.log(props.navigation.getParam('name'))
    }

    getDataUser() {
        db.ref('/user').on('value', (snapshot) => {
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

    render() {
        console.disableYellowBox = true
        const { name } = this.props
        console.log(this.getDataUser)
        return (
            <View>
                <StatusBar backgroundColor="#047cad" barStyle="light-content" />
                <View style={{ backgroundColor: '#0092CD', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                            <Icon name="arrow-left" style={{ fontSize: 25, color: 'white' }}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Detailscreen')} >
                            <Text style={{ color: 'white', fontSize: 15 }}>{this.HandleGetUserId}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>hello</Text>
                    </View>
                    <View></View>
                    {/* <Text>hello</Text> */}
                </View>
            </View>
        )
    }
}

export default Detailscreen;