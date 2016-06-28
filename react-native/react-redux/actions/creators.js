'use strict'

import * as types from './types'

export function sync (timer) {
    return {
        type: types.SYNC,
        progress: timer.elapsed / timer.total,
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
