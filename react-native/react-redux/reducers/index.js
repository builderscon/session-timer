import { combineReducers } from 'redux'

import timer from './timer'
import modal from './modal'

export default combineReducers({
    timer,
    modal,
})

