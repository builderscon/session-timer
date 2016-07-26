import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import Spacer from './spacer'
import Header from './header'
import Timer from './timer'
import Footer from './footer'
import Modal from 'react-native-modalbox'
import Copyright from './copyright'
import {
    NotificatableTimer,
    PRESETS,
} from 'builderscon-session-timer-domain'
import sound from '../lib/sound'

const FPS = 60

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#eeeeee',
    },
    modal: {
        height: 300,
        width: 300,
        borderRadius: 16,
    },
})

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.index = 0

        this.timerContext = {
            sound,
            onTerminate: () => {
                this.stop()
                this.props.actions.terminate()
            },
        }

        this.timer = new NotificatableTimer(
            PRESETS[this.index],
            this.timerContext
        )
    }

    start() {
        this.timer.start()
        const { actions } = this.props
        actions.start()
        this.intervalId = setInterval(() => actions.sync(this.timer), 1000 / FPS)
    }

    stop() {
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
        if (PRESETS.length <= this.index) {
            this.index = 0
        }

        this.timer = new NotificatableTimer(
            PRESETS[this.index],
            this.timerContext
        )

        const { actions } = this.props
        actions.reset()
        actions.sync(this.timer)
    }

    showCopyright() {
        this.refs.copyright.open()
    }

    render() {
        const { state } = this.props
        return (
            <View style={styles.container}>
                <Spacer />

                <Header
                    onPressLogo={() => this.showCopyright()}
                    onPressPresets={() => {state.isRunning || this.togglePresets()}}
                />

                <Timer
                    state={state}
                    timer={this.timer}
                />

                <Footer
                    state={state}
                    onPressToggle={() => state.isReady && (state.isRunning ? this.stop(): this.start())}
                    onPressReset={() => {state.isRunning || this.reset()}}
                />

                <Modal
                    ref="copyright"
                    position="center"
                    style={styles.modal}
                >
                    <Copyright />
                </Modal>
            </View>
        )
    }
}
