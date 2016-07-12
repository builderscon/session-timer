import Sound from 'react-native-sound'

const SOUND_FILE_NAME = 'tin2.mp3'
const ting = new Sound(SOUND_FILE_NAME, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('cant load sound', SOUND_FILE_NAME)
    }
})

export default class {
    static play() {
        ting.play()
    }

    static playTwice(delay = 200) {
        ting.play()
        const timeoutId = setTimeout(() => {
            ting.stop()
            const innerId = setTimeout(() => {
                ting.play()
                clearTimeout(innerId)
            }, 0)
            clearTimeout(timeoutId)
        }, delay)
    }
}
