const actionKinds = [
    'SYNC',
    'START',
    'STOP',
    'RESET',
    'TERMINATE',
]

function buildActionTypes(kinds) {
    const result = {}
    kinds.forEach(type => {
        result[type] = type
    })
    return result
}

export default buildActionTypes(actionKinds)
