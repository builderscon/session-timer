import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    header: {
        top: 20,
        flex: 0.56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    copyright: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    copyrightButton: {
        width: 90,
        backgroundColor: '#444',
        borderRadius: 36,
        right: 36,
    },
    logo: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        left: 18,
    },
    preset: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    presetButton: {
        width: 180,
        height: 50,
        backgroundColor: '#444',
        borderRadius: 36,
        left: 36,
    },
    presetText: {
        alignSelf: 'center',
        fontFamily: 'avenir',
        color: '#fff',
        fontSize: 32,
        right: 18,
        height: 50,
    },
})

export default function Header(props) {
    return (
        <View style={styles.header}>
            <View style={styles.copyright}>
                <TouchableWithoutFeedback
                    activeOpacity={1}
                    onPress={props.onPressLogo}
                >
                    <View style={styles.copyrightButton}>
                        <Image source={{uri: 'hex_logo'}} style={styles.logo} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.preset}>
                <TouchableWithoutFeedback
                    activeOpacity={1}
                    onPress={props.onPressPresets}>
                    <View style={styles.presetButton}>
                        <Text style={styles.presetText}>Preset</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
