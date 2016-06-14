'use strict'

import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native'
import * as Progress from 'react-native-progress'
import NotificatableTimer from '../domain/notification-timer'

const { PropTypes } = React

const DEFAULT = {
    FPS: 60,
    TOTAL: 60 * 60 * 1000,
}
function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

export default class CircularTimer extends Component {
    static get propTypes () {
        return {
            total: PropTypes.number,
            terminateCallback: PropTypes.func,
            notifications: PropTypes.arrayOf(PropTypes.object),
            progress: PropTypes.number,
            fps: PropTypes.number,
        }
    }

    constructor(props) {
        super(props)

        this.total = props.total != null
            ? props.total
            : DEFAULT.TOTAL

        const terminateCallback = props.terminateCallback
            ? props.terminateCallback
            : () => {}

        this.timer = new NotificatableTimer({
            total: this.total,
            terminateCallback: terminateCallback,
            notifications: props.notifications,
            animation: {
                interval: 1000 / DEFAULT.FPS,
                callback: (duration, total) => {
                    const progress = duration / total
                    this.setState({
                        progress
                    })
                }
            },
        })

        const progress = props.progress != null
            ? props.progress
            : 0

        this.state = {
            progress: progress,
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
            <View>
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
