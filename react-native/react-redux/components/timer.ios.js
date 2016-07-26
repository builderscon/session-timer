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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        top: base / 4.0,
    },
    text: {
        top: -(base / 2),
        fontFamily: 'avenir',
        fontSize: base / 5,
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

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.icon}>
                    <Icon
                        name={this.iconName}
                        size={base / 6.5}
                        color={this.iconColor}
                    />
                </Text>

                <Progress.Circle
                    size={this.width}
                    progress={this.props.state.progress}
                    unfilledColor={this.circleColor}
                    color={'#eeeeee'}
                    thickness={10}
                />

                <Text style={[styles.text, {color: this.textColor}]}>
                    {this.remainingText}
                </Text>
            </View>
        )
    }
}
