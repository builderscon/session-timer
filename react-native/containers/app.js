'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native'
import CircularTimer from '../components/circular-timer'
import * as actions from '../actions/creators'

const FPS = 60

class App extends Component {
    constructor (props) {
        super(props)
    }

    toggle () {
        const { state, actions } = this.props
        state.timer.toggle()
        if (this.intervalId == null) {
            this.intervalId = setInterval(actions.sync, 1000 / FPS)
        } else {
            clearInterval(this.intervalId)
            delete this.intervalId
        }
    }

    render () {
        const { state, actions } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.toggle()} activeOpacity={1.0}>
                    <View>
                        <CircularTimer
                            total={state.timer.total}
                            progress={state.progress}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableHighlight onPress={actions.reset}>
                    <Text style={styles.reset}>Reset</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    reset: {
        color: 'rgba(0, 122, 255, 1)',
        fontSize: 32,
        marginTop: 16,
        padding: 8,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        borderRadius: 3,
    },
})


export default connect(state => ({
    state: state.timer
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(App)
