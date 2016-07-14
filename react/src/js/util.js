
export function toSeconds (ms) {
  return ms / 1000
}

export function padd (n, digit = 2) {
  return ('0'.repeat(digit) + n).substr(-digit)
}

export function humanize (rest) {
  const minutes = Math.floor(rest / 60)
  const seconds = Math.round(rest % 60)

  return `${padd(minutes)}:${padd(seconds)}`
}
