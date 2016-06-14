'use strict'

import * as types from '../actions/types'
import NotificatableTimer from '../domain/notification-timer'
import {
    Alert,
} from 'react-native'

const DEFAULT_TOTAL = 60 * 60 * 1000
const timerSettings = {
    total: 60 * 60 * 1000,
    terminateCallback: () => {
        Alert.alert('title', 'message')
    },
    notifications: [
        {
            at: 5 * 60 * 1000,
            callback: () => {
                Alert.alert('caution', 'last 5 minute')
            }
        },
        {
            at: 15 * 60 * 1000,
            callback: () => {
                Alert.alert('warning', 'last 15 minute')
            }
        }
    ],
}

const initialState = {
    progress: 0,
    running: false,
    timer: new NotificatableTimer(timerSettings),
}

export default function timer(state = initialState, action = {}) {
    switch (action.type) {
        case types.SYNC:
            return {
                ...state,
                progress: state.timer.duration / state.timer.total,
            }
        case types.RESET:
            // TODO: this is side effect?
            state.timer.reset()
            return {
                ...state,
                progress: 0,
            }
        default:
            return state
    }
}
