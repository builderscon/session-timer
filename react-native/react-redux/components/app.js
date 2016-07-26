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

const FPS = 10

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    app: {
        flex: 1,
        justifyContent: 'space-between',
    },
    timer: {
        flex: 1,
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

                <View
                    onLayout={event => {
                        const {x, y, width, height} = event.nativeEvent.layout
                        this.props.actions.rotate({x, y, width, height})
                    }}
                    style={styles.app}
                >
                    <Header
                        onPressLogo={() => this.showCopyright()}
                        onPressPresets={() => {state.isRunning || this.togglePresets()}}
                    />

                    <Timer
                        state={state}
                        timer={this.timer}
                        styles={styles.timer}
                    />

                    <Footer
                        state={state}
                        onPressToggle={() => state.isReady && (state.isRunning ? this.stop(): this.start())}
                        onPressReset={() => {state.isRunning || this.reset()}}
                    />
                </View>

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
