'use strict';

import Sound from 'react-native-sound'

const SOUND_FILE_NAME = 'tin2.mp3'
const ting = new Sound(SOUND_FILE_NAME, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('cant load sound', SOUND_FILE_NAME)
    }
})

function twiceTing (ting) {
    const DELAY = 180
    ting.play()
    const timeoutId = setTimeout(() => {
        ting.stop()
        ting.play()
        clearTimeout(timeoutId)
    }, DELAY)
}

const presets = {
    sixty: {
        total: 60 * 60 * 1000,
        terminateCallback: () => {
            Alert.alert('title', 'message')
        },
        notifications: [
            {
                at: 15 * 60 * 1000,
                callback: () => {
                    ting.play()
                },
            },
            {
                at: 5 * 60 * 1000,
                callback: () => {
                    twiceTing(ting)
                },
            },
        ],
    },
}

export default presets
