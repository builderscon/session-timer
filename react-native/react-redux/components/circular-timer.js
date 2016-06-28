'use strict'

import React, { Component } from 'react'
import * as Progress from 'react-native-progress'
import Device from '../lib/device';

const { PropTypes } = React

export default class CircularTimer extends Component {
    static get propTypes () {
        return {
            total: PropTypes.number.isRequired,
            progress: PropTypes.number.isRequired,
        }
    }

    constructor(props) {
        super(props)

        this.width = Device.shorter * 0.8
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
                size={this.width}
                progress={this.props.progress}
                unfilledColor={this.circleColor}
                color={'#eeeeee'}
                thickness={10}
            />
        )
    }
}
