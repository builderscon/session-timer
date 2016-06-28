'use strict'

import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'
import * as Progress from 'react-native-progress'

const { PropTypes } = React

function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

export default class CircularTimer extends Component {
    static get propTypes () {
        return {
            total: PropTypes.number.isRequired,
            progress: PropTypes.number.isRequired,
        }
    }

    constructor(props) {
        super(props)
    }

    formatProgress () {
        const { total, progress } = this.props
        const remaining = (total * (1 - progress)) / 1000
        const remainingMinutes = Math.floor(remaining / 60)
        const remainingSeconds = Math.floor(remaining % 60)
        return zeroPadding(remainingMinutes) + ':' + zeroPadding(remainingSeconds)
    }

    get circleColor () {
        return this.props.running ? '#5db7e8' : '#ea5432'
    }
    get textColor () {
        return this.props.running ? '#222222' : '#777777'
    }

    render () {
        return (
            <Progress.Circle
                size={310}
                progress={this.props.progress}
                unfilledColor={this.circleColor}
                color={'#eeeeee'}
                thickness={10}
                showsText={true}
                formatText={() => this.formatProgress()}
                textStyle={[styles.timerText, {color: this.textColor}]}
            />
        )
    }
}

const styles = StyleSheet.create({
    timerText: {
        color: '#ddcecd',
        top: 10,
        fontFamily: 'avenir',
        fontSize: 70,
    },
})
