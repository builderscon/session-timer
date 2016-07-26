import React from 'react'
import {
    Image,
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
import {
    NotificatableTimer,
    PRESETS,
} from 'builderscon-session-timer-domain'
import sound from '../lib/sound'

const FPS = 10
const ANIMATION_DURATION = 30 * 1000
const MAX_DEGREE = 360

function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
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
    get remainingText () {
        const { state } = this.props
        const total = this.timer.total
        const progress = state.progress
        const remaining = (total * (1 - progress)) / 1000
        const remainingMinutes = Math.floor(remaining / 60)
        const remainingSeconds = Math.floor(remaining % 60)
        return zeroPadding(remainingMinutes) + ':' + zeroPadding(remainingSeconds)
    }

    get angleStyle() {
        const offset = this.timer.elapsed % ANIMATION_DURATION
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
        const { state, actions } = this.props
        return (
            <View style={styles.container}>
                <Header
                    onPressLogo={() => this.showCopyright()}
                    onPressPresets={() => {state.isRunning || this.togglePresets()}}
                />
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
                    <Text style={styles.text}>{this.remainingText}</Text>
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
