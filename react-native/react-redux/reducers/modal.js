import ACTION_TYPES from '../actions/types'

const initialState = {
    presetIsOpen: false,
}

export default function timer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_TYPES.OPEN_PRESET_MODAL:
            return {
                ...state,
                presetIsOpen: true,
            }
        case ACTION_TYPES.CLOSE_PRESET_MODAL:
            return {
                ...state,
                presetIsOpen: false,
            }
        default:
            return state
    }
}
