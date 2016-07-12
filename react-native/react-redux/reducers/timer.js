import ACTION_TYPES from '../actions/types'

const initialState = {
    progress: 0,
    isRunning: false,
    isReady: true,
}

export default function timer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_TYPES.SYNC:
            return {
                ...state,
                progress: action.progress,
            }
        case ACTION_TYPES.START:
            return {
                ...state,
                isRunning: true,
            }
        case ACTION_TYPES.STOP:
            return {
                ...state,
                isRunning: false,
            }
        case ACTION_TYPES.RESET:
            return {
                ...state,
                progress: 0,
                isReady: true,
            }
        case ACTION_TYPES.TERMINATE:
            return {
                ...state,
                isReady: false,
            }
        default:
            return state
    }
}
