import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 180,
        height: 50,
        backgroundColor: '#444',
        borderRadius: 36,
        left: 36,
    },
    text: {
        alignSelf: 'center',
        fontFamily: 'avenir',
        color: '#fff',
        fontSize: 32,
        right: 18,
        height: 50,
    },
})

export default function Presets(props) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                activeOpacity={1}
                onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.text}>Preset</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
