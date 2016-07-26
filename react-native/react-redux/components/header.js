import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import Logo from './logo'
import Presets from './presets'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default function Header(props) {
    return (
        <View style={styles.container}>
            <Logo onPress={props.onPressLogo} />
            <Presets onPress={props.onPressPresets} />
        </View>
    )
}
