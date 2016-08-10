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
import Presets from './presets'
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
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timer: {
        flex: 1,
    },
    modalPresets: {
        height: 428,
        width: 300,
        borderRadius: 16,
    },
    modalCopyright: {
        height: 300,
        width: 300,
        borderRadius: 16,
    },
})

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.timerContext = {
            sound,
            onTerminate: () => {
                this.stop()
                this.props.actions.terminate()
            },
        }

        this.timer = new NotificatableTimer(
            PRESETS[0],
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

    setPresets(index) {
        this.timer = new NotificatableTimer(
            PRESETS[index],
            this.timerContext
        )

        const { actions } = this.props
        actions.reset()
        actions.sync(this.timer)
        actions.closePresetModal()
    }

    showCopyright() {
        this.refs.copyright.open()
    }

    showPresets() {
        this.refs.presets.open()
    }

    render() {
        const { state, modal } = this.props
        return (
            <View style={styles.container}>
                <Spacer />

                <View style={styles.app}>
                    <Header
                        onPressLogo={() => this.showCopyright()}
                        onPressPresets={() => {state.isRunning || this.showPresets()}}
                    />

                    <View style={styles.horizontalContainer}>
                        <Timer
                            state={state}
                            timer={this.timer}
                            styles={styles.timer}
                        />
                    </View>

                    <Footer
                        state={state}
                        onPressToggle={() => state.isReady && (state.isRunning ? this.stop(): this.start())}
                        onPressReset={() => {state.isRunning || this.reset()}}
                    />
                </View>

                <Modal
                    ref="presets"
                    position="center"
                    style={styles.modalPresets}
                    isOpen={modal.presetIsOpen}
                >
                    <Presets
                        presets={PRESETS}
                        onPress={index => this.setPresets(index)}
                    />
                </Modal>

                <Modal
                    ref="copyright"
                    position="center"
                    style={styles.modalCopyright}
                >
                    <Copyright />
                </Modal>
            </View>
        )
    }
}
