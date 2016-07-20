import React, { Component } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modalbox'
import CircularTimer from '../components/circular-timer'
import Copyright from '../components/copyright'
import Device from '../lib/device'
import {
    NotificatableTimer,
    PRESETS,
} from 'builderscon-session-timer-domain'
import sound from '../lib/sound'

const FPS = 60

function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

const base = Device.shorter
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#eeeeee',
    },
    timer: {
        flex: 2,
        alignSelf: 'center',
    },
    icon: {
        top: base / 4.5,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        top: -(base / 2.3),
        fontFamily: 'avenir',
        fontSize: base / 6,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    alertTimes: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        height: 44,
        width: 120,
        right: -80,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    bellIcon: {
        right: 5
    },
    alertTime: {
        fontSize: 23,
        fontFamily: 'avenir',
        color: '#777'
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
        color: '#eeeeee',
        fontSize: 45,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    toggleButton: {
        height: 100,
        paddingTop: 20,
        textAlign: 'center',
        color: '#eeeeee',
        fontSize: 45,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    header: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    copyrightButton: {
        width: 100,
        backgroundColor: '#444',
        height: 55,
        borderRadius: 36,
        right: 36,
        alignItems: 'center',
        justifyContent: 'center',
        top: 10
    },
    logo: {
        width: 50,
        height: 50,
        left: 18,
    },
    presetButton: {
        width: 200,
        height: 55,
        backgroundColor: '#444',
        borderRadius: 36,
        left: 36,
        justifyContent: 'center',
        alignItems: 'center',
        top: 10
    },
    presetText: {
        fontFamily: 'avenir',
        color: '#fff',
        fontSize: 30,
        right: 10,
    },
    modal: {
        height: 300,
        width: 300,
        borderRadius: 16,
    },
})

export default class App extends Component {
    constructor (props) {
        super(props)

        this.index = 0
        this.presets = PRESETS
        this.timer = new NotificatableTimer(
            this.presets[this.index],
            this.timerContext
        )
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
        this.timer = new NotificatableTimer(
            this.presets[this.index],
            this.timerContext
        )
        const { actions } = this.props
        actions.reset()
        actions.sync(this.timer)
    }

    showCopyright() {
        this.refs.copyright.open()
    }

    get timerContext() {
        return {
            sound,
            onTerminate: () => {
                this.stop()
                this.props.actions.terminate()
            },
        }
    }

    get iconName () {
        return this.props.state.isRunning ? 'play': 'pause'
    }
    get iconColor () {
        return this.props.state.isRunning ? '#222222' : '#777777'
    }
    get textColor () {
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
                    <TouchableWithoutFeedback
                        activeOpacity={1}
                        onPress={() => this.showCopyright()}
                    >
                        <View style={styles.copyrightButton}>
                            <Image source={{uri: 'hex_logo'}} style={styles.logo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        activeOpacity={1}
                        onPress={() => {state.isRunning || this.togglePresets()}}>
                        <View style={styles.presetButton}>
                            <Text style={styles.presetText}>Preset</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.timer}>
                    <View style={styles.alertTimes}>
                        <Text style={styles.bellIcon}>
                            <Icon
                                name={'bell'}
                                size={base / 20}
                                color={'#777'}
                            />
                        </Text>
                        <Text style={styles.alertTime}>{'50'}</Text>
                    </View>
                    <Text style={styles.icon}>
                        <Icon
                            name={this.iconName}
                            size={base / 10}
                            color={this.iconColor}
                        />
                    </Text>
                    <CircularTimer
                        total={this.timer.total}
                        progress={state.progress}
                        isRunning={state.isRunning}
                    />
                    <Text style={[styles.text, {color: this.textColor}]}>{this.remainingText}</Text>
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
