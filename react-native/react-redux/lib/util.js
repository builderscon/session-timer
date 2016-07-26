export function zeroPadding (n) {
    return ('0' + n.toString()).slice(-2)
}

export function progressToHoursMinutes(progress, total) {
    const remaining = (total * (1 - progress)) / 1000
    const remainingMinutes = Math.floor(remaining / 60)
    const remainingSeconds = Math.floor(remaining % 60)
    return zeroPadding(remainingMinutes) + ':' + zeroPadding(remainingSeconds)
}
