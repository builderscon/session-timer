const SECONDS = 1000
const MINUTES = 60 * SECONDS

const PRESETS = [
    {
        total: 60 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [30 * MINUTES]: context => context.sound.play(),
            [45 * MINUTES]: context => context.sound.play(),
            [50 * MINUTES]: context => context.sound.playTwice(),
        },
    },
    {
        total: 30 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [15 * MINUTES]: context => context.sound.play(),
            [20 * MINUTES]: context => context.sound.playTwice(),
        },
    },
    {
        total: 15 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [5 * MINUTES]: context => context.sound.play(),
        },
    },
    {
        total: 5 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [4 * MINUTES]: context => context.sound.play(),
        },
    },
    {
        total: 1 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [50 * SECONDS]: context => context.sound.play(),
        },
    },
]

Object.freeze(PRESETS)

export default PRESETS
