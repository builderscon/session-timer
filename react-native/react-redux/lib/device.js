import Dimensions from 'Dimensions';

export default class Device {
    static get width() {
        return Dimensions.get('window').width
    }
    static get height() {
        return Dimensions.get('window').height
    }
    static get shorter() {
        const width = Device.width
        const height = Device.height
        return width < height ? width : height
    }
}
