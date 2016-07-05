import React, { Component } from 'react'
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    copyright: {
        height: 300,
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 16,
    },
    copyrightText: {
        flex: 0.5,
        fontSize: 24,
        alignSelf: 'center',
    },
    copyrightLogo: {
        flex: 0.5,
        alignSelf: 'center',
        width: 200,
    },
    copyrightButtons: {
        flex: 1,
        flexDirection: 'row',
    },
    copyrightButton: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
    },
})

const URL = {
    HOME: 'http://builderscon.io/',
    TWITTER: 'https://twitter.com/builderscon',
    GITHUB: 'https://github.com/builderscon',
}

function openUrl(url) {
    Linking
        .openURL(url)
        .catch(err => console.error(`Can not open URL: ${url}`, err));
}

export default function Copyright() {
    return (
        <View style={styles.copyright}>
            <View style={{flex: 0.3}} />
            <Text style={styles.copyrightText}>powerd by</Text>
            <Image style={styles.copyrightLogo} source={{uri: 'logo'}} resizeMode="contain" />
            <View style={styles.copyrightButtons}>
                <View style={{flex: 0.5}} />
                <Text style={styles.copyrightButton} onPress={() => {openUrl(URL.HOME)}}>
                    <Icon
                        name="home"
                        size={48}
                        color="black"
                    />
                </Text>
                <Text style={styles.copyrightButton} onPress={() => {openUrl(URL.TWITTER)}}>
                    <Icon
                        name="twitter"
                        size={48}
                        color="black"
                    />
                </Text>
                <Text style={styles.copyrightButton} onPress={() => {openUrl(URL.GITHUB)}}>
                    <Icon
                        name="github"
                        size={48}
                        color="black"
                    />
                </Text>
                <View style={{flex: 0.5}} />
            </View>
            <View style={{flex: 0.3}} />
        </View>
    )
}
