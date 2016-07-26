import React from 'react'
import {
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#444',
        borderTopRightRadius: 36,
        borderBottomRightRadius: 36,
    },
    image: {
        width: 50,
        height: 50,
    },
})

export default function Logo(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.button}
        >
            <Image
                source={{uri: 'hex_logo'}}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}
