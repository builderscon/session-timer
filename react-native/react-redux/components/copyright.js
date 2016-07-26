import React from 'react'
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 300,
        padding: 32,
        backgroundColor: '#eeeeee',
        borderRadius: 16,
        alignItems: 'center',
    },
    copyright: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    text: {
        height: 28,
        fontSize: 24,
    },
    logo: {
        width: 200,
        height: 64,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: 48,
        height: 48,
        margin: 16,
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
        <View style={styles.container}>
            <View style={styles.copyright}>
                <Text style={styles.text}>powerd by</Text>
                <Image
                    source={{uri: 'logo'}}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => {openUrl(URL.HOME)}}>
                    <Text style={styles.button}>
                        <Icon
                            name="home"
                            size={48}
                            color="black"
                        />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {openUrl(URL.TWITTER)}}>
                    <Text style={styles.button}>
                        <Icon
                            name="twitter"
                            size={48}
                            color="black"
                        />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {openUrl(URL.GITHUB)}}>
                    <Text style={styles.button}>
                        <Icon
                            name="github"
                            size={48}
                            color="black"
                        />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
