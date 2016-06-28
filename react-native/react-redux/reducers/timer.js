'use strict'

import * as types from '../actions/types'
import NotificatableTimer from '../../domain/notification-timer'
import {
    Alert,
} from 'react-native'
import presets from '../../domain/presets'

const initialState = {
    progress: 0,
    running: false,
    timer: new NotificatableTimer(presets.sixty),
}

export default function timer(state = initialState, action = {}) {
    switch (action.type) {
        case types.SYNC:
            return {
                ...state,
                progress: state.timer.duration / state.timer.total,
            }
        case types.START:
            state.timer.start()
            return {
                ...state,
                running: true,
            }
        case types.STOP:
            state.timer.stop()
            return {
                ...state,
                running: false,
            }
        case types.RESET:
            state.timer.reset()
            return {
                ...state,
                progress: 0,
            }
        default:
            return state
    }
}
