'use strict'

import * as types from './types'

export function sync () {
    return {
        type: types.SYNC
    }
}

export function start () {
    return {
        type: types.START
    }
}

export function stop () {
    return {
        type: types.STOP
    }
}

export function reset () {
    return {
        type: types.RESET
    }
}
