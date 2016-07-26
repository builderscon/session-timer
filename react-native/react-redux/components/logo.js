import React from 'react'
import {
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    button: {
        width: 90,
        backgroundColor: '#444',
        borderRadius: 36,
        right: 36,
    },
    image: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        left: 18,
    },
})

export default function Logo(props) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                activeOpacity={1}
                onPress={props.onPress}
            >
                <View style={styles.button}>
                    <Image source={{uri: 'hex_logo'}} style={styles.image} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
