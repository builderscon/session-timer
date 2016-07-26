import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        width: 140,
        height: 50,
        backgroundColor: '#444',
        borderTopLeftRadius: 36,
        borderBottomLeftRadius: 36,
    },
    text: {
        height: 50,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 32,
        fontFamily: 'avenir',
    },
})

export default function Presets(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.button}
        >
            <Text style={styles.text}>Preset</Text>
        </TouchableOpacity>
    )
}
