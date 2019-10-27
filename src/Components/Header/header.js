import React from 'react'
import { View } from 'react-native'
import { Entypo } from '@expo/vector-icons';

function Title(props) {
    return (
        <View style={{ flexDirection: "row" }}>
            <Entypo size={32} color="#EF5350" style={{marginLeft:20}} name="menu" onPress={() => props.navigation.toggleDrawer()} />
        </View>
    )
}


export default Title