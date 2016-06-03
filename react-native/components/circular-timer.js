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
import * as Progress from 'react-native-progress'
import NotificatableTimer from '../domain/notification-timer'

const FPS = 60
function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

export default class CircularTimer extends Component {
    constructor(props) {
        super(props)

        this.total = 60 * 60 * 1000
        this.timer = new NotificatableTimer({
            total: this.total,
            terminaterCallback: () => {
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
            animation: {
                interval: 1000 / FPS,
                callback: (duration, total) => {
                    const progress = duration / total
                    this.setState({
                        progress
                    })
                }
            },
        })

        this.state = {
            progress: 0,
        }
    }

    formatProgress (progress) {
        const remaining = (this.total * (1 - progress)) / 1000
        const remainingMinutes = Math.floor(remaining / 60)
        const remainingSeconds = Math.floor(remaining % 60)
        return zeroPadding(remainingMinutes) + ':' + zeroPadding(remainingSeconds)
    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.timer.toggle()} activeOpacity={1.0}>
                    <View>
                        <Progress.Circle
                            size={240}
                            progress={this.state.progress}
                            unfilledColor={'rgba(0, 122, 255, 1)'}
                            color={'#f5fcff'}
                            thickness={10}
                            showsText={true}
                            formatText={(progress) => this.formatProgress(progress)}
                            textStyle={styles.timerText}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableHighlight onPress={() => {
                    this.timer.reset()
                    this.setState({
                        progress: 0
                    })
                }}>
                    <Text style={styles.reset}>Reset</Text>
                </TouchableHighlight>
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
    timerText: {
        color: 'rgba(0, 122, 255, 1)',
    },
    reset: {
        color: 'rgba(0, 122, 255, 1)',
        fontSize: 32,
        marginTop: 16,
        padding: 8,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        borderRadius: 3,
    }
})
