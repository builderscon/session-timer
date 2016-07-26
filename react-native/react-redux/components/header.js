import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import Logo from './logo'
import Presets from './presets'

const styles = StyleSheet.create({
    header: {
        top: 20,
        flex: 0.56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Logo onPress={props.onPressLogo} />
            <Presets onPress={props.onPressPresets} />
        </View>
    )
}
