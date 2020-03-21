import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
// import Ava from './img/matthew.png'

class Homescreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    renderRow = ({ }) => {
        return (
            <View style={{ margin: 10, flexDirection: 'row' }}>
                <View style={{ marginVertical: 10, borderColor: '#FFF', borderWidth: 1, padding: 15, borderRadius: 10, backgroundColor: '#FFF' }}>
                    <Text>sadas</Text>
                </View>
                <Text style={{ padding: 10 }}></Text>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f4' }}>
                <View style={{ backgroundColor: 'blue' }}>
                    <Text style={{ padding: 10, marginVertical: 5, fontSize: 20, color: 'white' }}>HandsApp</Text>
                </View>

                {/* hello */}
                <View style={{ marginHorizontal: 10, marginVertical: 10, borderColor: '#FFF', borderWidth: 1, padding: 15, borderRadius: 10, backgroundColor: '#FFF', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: 'https://playjoor.com/assets/avatar/matthew.png' }}
                            style={{ width: 50, height: 50, borderRadius: 50, position: 'relative' }} />
                    </View>
                    <View style={{ flex: 5, paddingLeft: 20, paddingRight: 10 }}>
                        <Text>hello</Text>
                    </View>
                </View>
                <Text style={{ padding: 10 }}></Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                </View>

                <View style={{ padding: 0, flexDirection: 'row', maxHeight: 42, backgroundColor: 'white' }}>
                    <View style={{ flex: 8, padding: 3 }}>
                        <TextInput style={{ backgroundColor: 'white', fontSize: 12, paddingLeft: 15, paddingRight: 15 }} placeholder='Butuh apa ni ...?'>
                        </TextInput>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>hello</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default Homescreen;