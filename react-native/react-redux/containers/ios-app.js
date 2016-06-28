'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CircularTimer from '../components/circular-timer'
import * as actions from '../actions/creators'
import Device from '../lib/device'

const FPS = 60

function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

const base = Device.shorter
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
        top: base / 3.5,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        top: -(base / 1.8),
        fontFamily: 'avenir',
        fontSize: base / 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
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
        fontSize: 40,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    toggleButton: {
        height: 100,
        paddingTop: 20,
        textAlign: 'center',
        color: '#eeeeee',
        fontSize: 40,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    topView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    logo: {
        left: 20,
        top: 10,
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
    },
    rec: {
        left: 40,
        top: 20,
        width: 250,
        height: 70,
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 35
    },
    setting: {
        left: 30,
        fontFamily: 'avenir',
        color: '#fff',
        fontSize: 35,
        alignSelf: 'center'
    }
})

class App extends Component {
    constructor (props) {
        super(props)
    }

    start () {
        const { actions } = this.props
        actions.start()
        this.intervalId = setInterval(actions.sync, 1000 / FPS)
    }

    stop () {
        const { actions } = this.props
        actions.stop()
        clearInterval(this.intervalId)
    }

    get iconName () {
        return this.props.state.running ? 'play': 'pause'
    }
    get iconColor () {
        return this.props.state.running ? '#222222' : '#777777'
    }
    get textColor () {
        return this.props.state.running ? '#222222' : '#777777'
    }
    //TODO: disable the reset button when timer is runnning
    get resetButtonColor () {
        return this.props.state.running ? '#aaaaaa' : '#aaaaaa'
    }
    get toggleButtonColor () {
        return this.props.state.running ? '#ea5432' : '#5db7e8'
    }
    get toggleButtonText () {
        return this.props.state.running ? 'Stop': 'Start'
    }

    get remainingText () {
        const { state } = this.props
        const total = state.timer.total
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
                <View style={styles.topView}>
                    <View style={styles.rec}>
                        <Image
                            source={require('../../resources/images/hex_logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.setting}>Setting</Text>
                    </View>
                </View>
                <View style={styles.timer}>
                    <Text style={styles.icon}>
                        <Icon
                            name={this.iconName}
                            size={base / 6}
                            color={this.iconColor}
                        />
                    </Text>
                    <CircularTimer
                        total={state.timer.total}
                        progress={state.progress}
                        running={state.running}
                    />
                    <Text style={[styles.text, {color: this.textColor}]}>{this.remainingText}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <TouchableHighlight onPress={actions.reset}>
                            <Text style={[styles.resetButton, {backgroundColor: this.resetButtonColor}]}>Reset</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.button}>
                        <TouchableHighlight onPress={() => state.running ? this.stop(): this.start()}>
                            <Text style={[styles.toggleButton, {backgroundColor: this.toggleButtonColor}]}>{this.toggleButtonText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}


export default connect(state => ({
    state: state.timer
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(App)
