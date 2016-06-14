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

    formatProgress (progress) {
        const { total } = this.props
        const remaining = (total * (1 - progress)) / 1000
        const remainingMinutes = Math.floor(remaining / 60)
        const remainingSeconds = Math.floor(remaining % 60)
        return zeroPadding(remainingMinutes) + ':' + zeroPadding(remainingSeconds)
    }

    render () {
        const { progress } = this.props
        return (
            <Progress.Circle
                size={240}
                progress={progress}
                unfilledColor={'rgba(0, 122, 255, 1)'}
                color={'#f5fcff'}
                thickness={10}
                showsText={true}
                formatText={(progress) => this.formatProgress(progress)}
                textStyle={styles.timerText}
            />
        )
    }
}

const styles = StyleSheet.create({
    timerText: {
        color: 'rgba(0, 122, 255, 1)',
    },
})
