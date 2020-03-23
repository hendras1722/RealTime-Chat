import React, { Component } from 'react'
import {
    View, Text, Image, TouchableOpacity, TextInput, StatusBar, FlatList
} from 'react-native'
// import Ava from './img/matthew.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import { auth, db } from '../../Config/Config'

class HomeChat extends Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        users: []
    }

    componentDidMount() {
        this.getDataUser()
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

    onLogout = async () => {
        auth.signOut()
            .then(res => console.warn("oke"))
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: 'data:image/jpeg;base64,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' }}
                            style={{ width: 65, height: 65, borderRadius: 50, position: 'relative', paddingBottom: 10 }} />

                        {/* <Text>hello</Text> */}
                    </View>
                    <View style={{ flex: 2, borderColor: 'black', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15 }}>{item.name}</Text>
                        <Text>hello</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    Homechat = (_id) => {
        this.props.navigation.navigate('Homechat');
    }
    render() {

        console.disableYellowBox = true
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>

                {/* hello */}
                <View>
                    <FlatList
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => { item.uid }}
                    />
                </View>
            </View>

        )
    }
}

export default withNavigation(HomeChat);