'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Easing,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modalbox'
import CircularTimer from '../components/circular-timer'
import Copyright from '../components/copyright'
import * as actions from '../actions/creators'
import NotificatableTimer from '../../domain/notification-timer'
import presets from '../../domain/presets'

const FPS = 10

function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

class App extends Component {
    constructor (props) {
        super(props)
        this.index = 0
        this.presets = presets.map((preset) => {
            const original = preset.terminateCallback
            preset.terminateCallback = () => {
                original()
                this.stop()
                this.props.actions.terminate()
            }
            return preset
        })
        this.timer = new NotificatableTimer(this.presets[this.index])
        this.angle = new Animated.Value(0)
    }

    start () {
        this.timer.start()
        const { actions } = this.props
        actions.start()
        this.intervalId = setInterval(() => actions.sync(this.timer), 1000 / FPS)
    }

    stop () {
        this.timer.stop()
        this.props.actions.stop()
        clearInterval(this.intervalId)
    }

    reset() {
        this.props.actions.reset()
        this.timer.reset()
    }

    togglePresets() {
        ++this.index
        if (this.presets.length <= this.index) {
            this.index = 0
        }
        this.timer = new NotificatableTimer(this.presets[this.index])
        const { actions } = this.props
        actions.reset()
        actions.sync(this.timer)
    }

    showCopyright() {
        this.refs.copyright.open()
    }

    get iconName () {
        return this.props.state.isRunning ? 'play': 'pause'
    }
    get iconColor () {
        return this.props.state.isRunning ? '#222222' : '#777777'
    }
    get resetButtonColor () {
        return this.props.state.isRunning ? '#aaaaaa' : '#555555'
    }
    get toggleButtonColor () {
        return this.props.state.isReady
            ? this.props.state.isRunning ? '#ea5432' : '#5db7e8'
            : '#aaaaaa'
    }
    get toggleButtonText () {
        return this.props.state.isRunning ? 'Stop': 'Start'
    }

    componentDidMount() {
        // this._animate()
    }

    _animate() {
        this.angle.setValue(0)
        this.animation = Animated.timing(this.angle, {
            toValue: 360,
            duration: 60000,
            easing: Easing.linear,
        }).start(() => this._animate())
    }

    get remainingText () {
        const { state } = this.props
        const total = this.timer.total
        const progress = state.progress
        const remaining = (total * (1 - progress)) / 1000
        const remainingMinutes = Math.floor(remaining / 60)
        const remainingSeconds = Math.floor(remaining % 60)
        return zeroPadding(remainingMinutes) + ':' + zeroPadding(remainingSeconds)
    }

    render () {
        const { state, actions } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.copyright}>
                        <TouchableHighlight onPress={() => this.showCopyright()}>
                            <Image
                                source={require('../../resources/images/hex_logo.png')}
                                style={styles.logo}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 3}} />
                    <View style={styles.preset}>
                        <TouchableHighlight onPress={() => {state.isRunning || this.togglePresets()}}>
                            <Text style={styles.presetText}>Preset</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.timer}>
                    <View style={{marginTop: 64}} />
                    <Animated.Image
                        source={require('../../resources/images/hex_base.png')}
                        style={[styles.hex, {transform: [{
                            rotate: this.angle.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg'],
                            })
                        }]}]}
                    />
                    <Text style={styles.icon}>
                        <Icon
                            name={this.iconName}
                            size={40}
                            color={this.iconColor}
                        />
                    </Text>
                    <Text style={styles.text}>{this.remainingText}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <TouchableHighlight onPress={() => {state.isRunning || this.reset()}}>
                            <Text style={[styles.resetButton, {backgroundColor: this.resetButtonColor}]}>Reset</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.button}>
                        <TouchableHighlight onPress={() => state.isReady && (state.isRunning ? this.stop(): this.start())}>
                            <Text style={[styles.toggleButton, {backgroundColor: this.toggleButtonColor}]}>{this.toggleButtonText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Modal style={styles.modal} position="center" ref="copyright">
                    <Copyright />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#eeeeee',
    },
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
    buttons: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        flex: 1,
    },
    resetButton: {
        height: 100,
        paddingTop: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#eeeeee',
        fontSize: 40,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    toggleButton: {
        height: 100,
        paddingTop: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#eeeeee',
        fontSize: 40,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    header: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    copyright: {
        flex: 2,
        backgroundColor: '#444',
        borderRadius: 36,
        right: 20,
    },
    logo: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        left: 20,
    },
    preset: {
        flex: 5,
        backgroundColor: '#444',
        borderRadius: 36,
        left: 20,
    },
    presetText: {
        fontFamily: 'avenir',
        color: '#fff',
        fontSize: 36,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    modal: {
        height: 300,
        width: 300,
        borderRadius: 16,
    },
})


export default connect(state => ({
    state: state.timer
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(App)
