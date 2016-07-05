import * as types from '../actions/types'

const initialState = {
    progress: 0,
    isRunning: false,
    isReady: true,
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
                isRunning: true,
            }
        case types.STOP:
            return {
                ...state,
                isRunning: false,
            }
        case types.RESET:
            return {
                ...state,
                progress: 0,
                isReady: true,
            }
        case types.TERMINATE:
            return {
                ...state,
                isReady: false,
            }
        default:
            return state
    }
}
