const actionKinds = [
    'SYNC',
    'START',
    'STOP',
    'RESET',
    'TERMINATE',
    'OPEN_PRESET_MODAL',
    'CLOSE_PRESET_MODAL',
]

function buildActionTypes(kinds) {
    const result = {}
    kinds.forEach(type => {
        result[type] = type
    })
    return result
}

export default buildActionTypes(actionKinds)
