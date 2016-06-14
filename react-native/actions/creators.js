'use strict'

import * as types from './types'

export function sync () {
    return {
        type: types.SYNC
    }
}

export function reset () {
    return {
        type: types.RESET
    }
}
