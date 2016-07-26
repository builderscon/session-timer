import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Progress from 'react-native-progress'
import Device from '../lib/device'
import { progressToHoursMinutes } from '../lib/util'

const base = Device.shorter
const SIZE = base * 0.75
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: base / 5,
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

    render () {
        return (
            <View style={[styles.container, {
                left: (this.props.state.window.width - SIZE) / 2
            }]}>
                <Progress.Circle
                    size={SIZE}
                    progress={this.props.state.progress}
                    unfilledColor={this.circleColor}
                    color={'#eeeeee'}
                    thickness={base / 50}
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
                            size={base / 6.5}
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
