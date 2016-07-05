import Sound from 'react-native-sound'

const SOUND_FILE_NAME = 'tin2.mp3'
const ting = new Sound(SOUND_FILE_NAME, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('cant load sound', SOUND_FILE_NAME)
    }
})

function twiceTing () {
    const DELAY = 300
    ting.play()
    const timeoutId = setTimeout(() => {
        ting.stop()
        ting.play()
        clearTimeout(timeoutId)
    }, DELAY)
}

const presets = [
    {
        total: 60 * 60 * 1000,
        terminateCallback: () => twiceTing(),
        notifications: {
            [20 * 60 * 1000]: () => ting.play(),
            [15 * 60 * 1000]: () => ting.play(),
            [10 * 60 * 1000]: () => twiceTing(),
        },
    },
    {
        total: 30 * 60 * 1000,
        terminateCallback: () => twiceTing(),
        notifications: {
            [15 * 60 * 1000]: () => ting.play(),
            [10 * 60 * 1000]: () => twiceTing(),
        },
    },
    {
        total: 5 * 60 * 1000,
        terminateCallback: () => twiceTing(),
        notifications: {
        },
    },
    {
        total: 1 * 60 * 1000,
        terminateCallback: () => twiceTing(),
        notifications: {
            [20 * 1000]: () => ting.play(),
            [10 * 1000]: () => twiceTing(),
        },
    },
]

export default presets
