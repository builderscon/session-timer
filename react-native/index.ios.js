'use strict'

import React, { Component } from 'react'
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native'
import CircularTimer from './components/circular-timer'

const timerSettings = {
    total: 60 * 60 * 1000,
    terminateCallback: () => {
        Alert.alert('title', 'message')
    },
    notifications: [
        {
            at: 5 * 60 * 1000,
            callback: () => {
                Alert.alert('caution', 'last 5 minute')
            }
        },
        {
            at: 15 * 60 * 1000,
            callback: () => {
                Alert.alert('warning', 'last 15 minute')
            }
        }
    ],
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <View style={styles.container}>
                <CircularTimer
                    total={timerSettings.total}
                    terminateCallback={timerSettings.terminateCallback}
                    notifications={timerSettings.notifications}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
})

AppRegistry.registerComponent('App', () => App)
