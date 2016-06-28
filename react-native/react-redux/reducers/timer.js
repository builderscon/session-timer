'use strict'

import * as types from '../actions/types'
import {
    Alert,
} from 'react-native'

const initialState = {
    progress: 0,
    running: false,
}

export default function timer(state = initialState, action = {}) {
    switch (action.type) {
        case types.SYNC:
            return {
                ...state,
                progress: action.progress,
            }
        case types.START:
            return {
                ...state,
                running: true,
            }
        case types.STOP:
            return {
                ...state,
                running: false,
            }
        case types.RESET:
            return {
                ...state,
                progress: 0,
            }
        default:
            return state
    }
}
