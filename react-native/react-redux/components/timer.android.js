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
const WIDTH = base * 0.75
const HEIGHT = base * 0.75
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: WIDTH,
        height: HEIGHT,
    },
    hex: {
        width: WIDTH,
        height: HEIGHT,
    },
    indicators: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: base / 5.4,
        fontFamily: 'avenir',
        fontWeight: 'bold',
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
        this.state = {
            width: 0,
            height: 0,
        }
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
            <View style={[styles.container, {
                left: (this.props.state.window.width - WIDTH) / 2
            }]}>
                <Image
                    source={{uri: 'hex_base'}}
                    style={[styles.hex, this.angleStyle]}
                />
                <View
                    onLayout={event => {
                        const {x, y, width, height} = event.nativeEvent.layout
                        this.setState({x, y, width, height})
                    }}
                    style={[styles.indicators, {
                        top: (HEIGHT - this.state.height) / 2,
                        left: (WIDTH - this.state.width) / 2,
                    }]}
                >
                    <Text style={styles.icon}>
                        <Icon
                            name={this.iconName}
                            size={base / 8}
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
