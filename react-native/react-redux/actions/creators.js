import types from './types'

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

export function terminate() {
    return {
        type: types.TERMINATE
    }
}

export function openPresetModal() {
    return {
        type: types.OPEN_PRESET_MODAL
    }
}

export function closePresetModal() {
    return {
        type: types.CLOSE_PRESET_MODAL
    }
}
