import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Header from './header'
import Icon from 'react-native-vector-icons/FontAwesome'
import CircularTimer from './circular-timer'
import Footer from './footer'
import Modal from 'react-native-modalbox'
import Copyright from './copyright'
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
        paddingTop: 20,
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
        top: base / 4.0,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        top: -(base / 2),
        fontFamily: 'avenir',
        fontSize: base / 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    modal: {
        height: 300,
        width: 300,
        borderRadius: 16,
    },
})

export default class App extends React.Component {
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
                <Header
                    onPressLogo={() => this.showCopyright()}
                    onPressPresets={() => {state.isRunning || this.togglePresets()}}
                />
                <View style={styles.timer}>
                    <Text style={styles.icon}>
                        <Icon
                            name={this.iconName}
                            size={base / 6.5}
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
                <Footer
                    state={state}
                    onPressToggle={() => state.isReady && (state.isRunning ? this.stop(): this.start())}
                    onPressReset={() => {state.isRunning || this.reset()}}
                />
                <Modal style={styles.modal} position="center" ref="copyright">
                    <Copyright />
                </Modal>
            </View>
        )
    }
}
