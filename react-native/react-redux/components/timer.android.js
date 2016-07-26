import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Progress from 'react-native-progress'
import Device from '../lib/device'
import { progressToHoursMinutes } from '../lib/util'

const ANIMATION_DURATION = 30 * 1000
const MAX_DEGREE = 360

const { PropTypes } = React

const base = Device.shorter
const styles = StyleSheet.create({
    timer: {
        flex: 4,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icon: {
        top: -240,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        top: -220,
        fontSize: 64,
        fontFamily: 'avenir',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    hex: {
        alignSelf: 'flex-start',
        width: 300,
        height: 300,
    },
})

export default class Timer extends React.Component {
    static get propTypes () {
        return {
            state: PropTypes.object.isRequired,
            timer: PropTypes.object.isRequired,
        }
    }

    constructor(props) {
        super(props)

        this.width = Device.shorter * 0.8
    }

    get iconName() {
        return this.props.state.isRunning ? 'play': 'pause'
    }
    get iconColor() {
        return this.props.state.isRunning ? '#222222' : '#777777'
    }
    get textColor() {
        return this.props.state.isRunning ? '#222222' : '#777777'
    }
    get remainingText() {
        const { state, timer } = this.props
        return progressToHoursMinutes(state.progress, timer.total)
    }

    get circleColor () {
        return this.props.state.isRunning ? '#5db7e8' : '#ea5432'
    }
    get textColor () {
        return this.props.state.isRunning ? '#222222' : '#777777'
    }

    get angleStyle() {
        const offset = this.props.timer.elapsed % ANIMATION_DURATION
        const angle = (offset / ANIMATION_DURATION) * MAX_DEGREE
        return {
            transform: [
                {
                    rotate: `${angle}deg`,
                },
            ]
        }
    }

    render () {
        return (
            <View style={styles.timer}>
                <View style={{marginTop: 64}} />
                <Image
                    source={{uri: 'hex_base'}}
                    style={[styles.hex, this.angleStyle]}
                />
                <Text style={styles.icon}>
                    <Icon
                        name={this.iconName}
                        size={40}
                        color={this.iconColor}
                    />
                </Text>
                <Text style={[styles.text, {color: this.textColor}]}>
                    {this.remainingText}
                </Text>
            </View>
        )
    }
}
