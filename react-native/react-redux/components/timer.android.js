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

const BASE = Device.shorter
const SIZE = BASE * 0.75
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZE,
        height: SIZE,
    },
    hex: {
        width: SIZE,
        height: SIZE,
    },
    indicators: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: BASE / 5.4,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
})

const { PropTypes } = React
export default class Timer extends React.Component {
    static get propTypes() {
        return {
            state: PropTypes.object.isRequired,
            timer: PropTypes.object.isRequired,
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
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
            <View style={styles.container}>
                <Image
                    source={{uri: 'hex_base'}}
                    style={[styles.hex, this.angleStyle]}
                />

                <View
                    onLayout={event => this.setState(event.nativeEvent.layout)}
                    style={[styles.indicators, {
                        top: (SIZE - this.state.height) / 2,
                        left: (SIZE - this.state.width) / 2,
                    }]}
                >
                    <Text style={styles.icon}>
                        <Icon
                            name={this.iconName}
                            size={BASE / 8}
                            color={this.iconColor}
                        />
                    </Text>
                    <Text style={[styles.text, {color: this.textColor}]}>
                        {this.remainingText}
                    </Text>
                </View>
            </View>
        )
    }
}
