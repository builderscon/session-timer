import Sound from 'react-native-sound'

const TING_FILE_NAME = 'tin2.mp3'
const ting = new Sound(TING_FILE_NAME, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('cant load sound', TING_FILE_NAME)
    }
})

const TING_TWICE_FILE_NAME = 'ting_twice.mp3'
const tingTwice = new Sound(TING_TWICE_FILE_NAME, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('cant load sound', TING_TWICE_FILE_NAME)
    }
})

export default class {
    static play() {
        ting.play()
    }

    static playTwice() {
        tingTwice.play()
    }
}
