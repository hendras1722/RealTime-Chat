import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
// import Ava from './img/matthew.png'

class Homescreen extends Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
        return (

            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#35B829" barStyle="light-content" />
                <View style={{ backgroundColor: 'blue' }}>
                    <Text style={{ padding: 10, marginVertical: 5, fontSize: 20, color: 'white' }}>HandsApp</Text>
                </View>
                {/* sction chat */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <View style={{ flexDirection: 'row', borderBottomColor: '#aeb3b9', borderBottomWidth: 0.5, height: 80, borderBottomEndRadius: 30, borderBottomStartRadius: 120 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, top: 5 }}>
                            <Image source={{ uri: 'https://playjoor.com/assets/avatar/matthew.png' }}
                                style={{ width: 65, height: 65, borderRadius: 50, position: 'relative', paddingBottom: 10 }} />
                        </View>
                        <View style={{ flex: 3, marginVertical: 10 }}>
                            <View style={{ top: 5 }}>
                                <Text style={{ fontSize: 18 }}>0896636042401</Text>
                            </View>
                            <View style={{ top: 10 }}>
                                <Text>Hello</Text>
                            </View>
                            {/* <Text style={{ color: '#aeb3b9', top: 15 }}> ─────────────────────── </Text> */}
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

export default Homescreen;